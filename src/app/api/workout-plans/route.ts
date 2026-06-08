import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

// GET /api/workout-plans
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trainerId = searchParams.get("trainerId");
    const memberId = searchParams.get("memberId");
    const activeOnly = searchParams.get("activeOnly") === "true";

    const tenantId = await requireTenant();

    const where: any = { tenantId };
    if (trainerId) where.trainerId = trainerId;
    if (memberId) where.memberId = memberId;
    if (activeOnly) where.isActive = true;

    const plans = await prisma.workoutPlan.findMany({
      where,
      include: {
        exercises: { orderBy: { order: "asc" } },
        trainer: { include: { user: { select: { name: true } } } },
        member: { include: { user: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: plans });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch workout plans" }, { status: 500 });
  }
}

// POST /api/workout-plans
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trainerId, memberId, name, description, startDate, endDate, exercises } = body;
    const tenantId = await requireTenant();

    const plan = await prisma.workoutPlan.create({
      data: {
        trainerId,
        memberId,
        tenantId,
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        exercises: {
          create: exercises.map((ex: any, index: number) => ({
            name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            restTime: ex.restTime || 60,
            weight: ex.weight || null,
            notes: ex.notes || null,
            dayOfWeek: ex.dayOfWeek ?? null,
            order: index,
          })),
        },
      },
      include: { exercises: true },
    });

    return NextResponse.json({ data: plan }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create workout plan" }, { status: 500 });
  }
}
