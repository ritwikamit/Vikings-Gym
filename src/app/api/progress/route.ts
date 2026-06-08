import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/progress
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get("memberId");

    if (!memberId) {
      return NextResponse.json({ error: "memberId is required" }, { status: 400 });
    }

    const records = await prisma.progressTracking.findMany({
      where: { memberId },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ data: records });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

// POST /api/progress
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { memberId, weight, chest, waist, arms, thighs, hips, bmi, bodyFatPercent, notes } = body;

    const record = await prisma.progressTracking.create({
      data: {
        memberId,
        weight,
        chest,
        waist,
        arms,
        thighs,
        hips,
        bmi,
        bodyFatPercent,
        notes,
      },
    });

    // Update member's weight if provided
    if (weight) {
      await prisma.member.update({
        where: { id: memberId },
        data: { weight },
      });
    }

    return NextResponse.json({ data: record }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create progress record" }, { status: 500 });
  }
}
