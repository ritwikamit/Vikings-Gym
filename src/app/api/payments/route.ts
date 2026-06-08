import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/payments
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const method = searchParams.get("method");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: any = {};

    if (status) where.status = status;
    if (method) where.method = method;
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const [payments, total, totalRevenue] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          member: {
            include: {
              user: { select: { name: true, email: true, phone: true } },
            },
          },
          membership: { include: { plan: true } },
          coupon: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.payment.count({ where }),
      prisma.payment.aggregate({
        where: { ...where, status: "COMPLETED" },
        _sum: { amount: true },
      }),
    ]);

    return NextResponse.json({
      data: payments,
      totalRevenue: totalRevenue._sum.amount || 0,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}

// POST /api/payments - Record payment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { memberId, membershipId, amount, method, description, couponCode } = body;

    let finalAmount = amount;
    let couponId = null;

    // Apply coupon if provided
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
      if (coupon && coupon.isActive && coupon.validUntil > new Date()) {
        if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
          return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
        }
        if (coupon.minAmount && amount < coupon.minAmount) {
          return NextResponse.json({ error: `Minimum amount ₹${coupon.minAmount} required` }, { status: 400 });
        }

        if (coupon.discountType === "PERCENTAGE") {
          finalAmount = amount - (amount * coupon.discountValue / 100);
        } else {
          finalAmount = amount - coupon.discountValue;
        }
        finalAmount = Math.max(finalAmount, 0);
        couponId = coupon.id;

        await prisma.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    const invoiceNumber = `VGM-${Date.now().toString(36).toUpperCase()}`;

    const payment = await prisma.payment.create({
      data: {
        memberId,
        membershipId: membershipId || null,
        amount: finalAmount,
        method: method || "CASH",
        status: "COMPLETED",
        description,
        invoiceNumber,
        couponId,
        paidAt: new Date(),
      },
      include: {
        member: { include: { user: true } },
        membership: { include: { plan: true } },
      },
    });

    return NextResponse.json({ data: payment }, { status: 201 });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
  }
}
