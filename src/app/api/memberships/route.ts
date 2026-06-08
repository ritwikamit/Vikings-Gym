import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/memberships
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const expiringSoon = searchParams.get("expiringSoon");

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (expiringSoon === "true") {
      const now = new Date();
      const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      where.status = "ACTIVE";
      where.endDate = {
        gte: now,
        lte: sevenDaysLater,
      };
    }

    const memberships = await prisma.membership.findMany({
      where,
      include: {
        member: {
          include: {
            user: { select: { name: true, email: true, phone: true, avatar: true } },
          },
        },
        plan: true,
      },
      orderBy: { endDate: "asc" },
    });

    return NextResponse.json({ data: memberships });
  } catch (error) {
    console.error("Error fetching memberships:", error);
    return NextResponse.json({ error: "Failed to fetch memberships" }, { status: 500 });
  }
}

// POST /api/memberships - Assign membership to member
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { memberId, planId, startDate, paymentMethod } = body;

    const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + plan.duration);

    // Expire any current active membership
    await prisma.membership.updateMany({
      where: { memberId, status: "ACTIVE" },
      data: { status: "EXPIRED" },
    });

    const membership = await prisma.membership.create({
      data: {
        memberId,
        planId,
        startDate: start,
        endDate: end,
        status: "ACTIVE",
      },
      include: { plan: true, member: { include: { user: true } } },
    });

    // Create payment record
    const invoiceNumber = `VGM-${Date.now().toString(36).toUpperCase()}`;
    await prisma.payment.create({
      data: {
        memberId,
        membershipId: membership.id,
        amount: plan.price,
        method: paymentMethod || "CASH",
        status: "COMPLETED",
        description: `Membership: ${plan.name}`,
        invoiceNumber,
        paidAt: new Date(),
      },
    });

    return NextResponse.json({ data: membership }, { status: 201 });
  } catch (error) {
    console.error("Error creating membership:", error);
    return NextResponse.json({ error: "Failed to create membership" }, { status: 500 });
  }
}
