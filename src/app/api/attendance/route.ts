import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

// GET /api/attendance
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const memberId = searchParams.get("memberId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const tenantId = await requireTenant();

    const where: any = { tenantId };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      where.date = { gte: startOfDay, lte: endOfDay };
    }

    if (memberId) {
      where.memberId = memberId;
    }

    const [records, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        include: {
          member: {
            include: {
              user: { select: { name: true, avatar: true, phone: true } },
            },
          },
        },
        orderBy: { checkIn: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.attendance.count({ where }),
    ]);

    return NextResponse.json({
      data: records,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
  }
}

// POST /api/attendance - Check in
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { memberId, method } = body;
    const tenantId = await requireTenant();

    // Check if already checked in today without checkout
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);

    const existingCheckIn = await prisma.attendance.findFirst({
      where: {
        memberId,
        tenantId,
        date: { gte: today, lte: endToday },
        checkOut: null,
      },
    });

    if (existingCheckIn) {
      // Auto checkout
      const updated = await prisma.attendance.update({
        where: { id: existingCheckIn.id },
        data: { checkOut: new Date() },
        include: { member: { include: { user: { select: { name: true } } } } },
      });
      return NextResponse.json({ data: updated, message: "Checked out successfully" });
    }

    const attendance = await prisma.attendance.create({
      data: {
        memberId,
        tenantId,
        method: method || "MANUAL",
        date: new Date(),
        checkIn: new Date(),
      },
      include: { member: { include: { user: { select: { name: true } } } } },
    });

    return NextResponse.json({ data: attendance, message: "Checked in successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error recording attendance:", error);
    return NextResponse.json({ error: "Failed to record attendance" }, { status: 500 });
  }
}
