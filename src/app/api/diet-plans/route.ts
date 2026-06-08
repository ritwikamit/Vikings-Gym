import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/diet-plans
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trainerId = searchParams.get("trainerId");
    const memberId = searchParams.get("memberId");
    const activeOnly = searchParams.get("activeOnly") === "true";

    const where: any = {};
    if (trainerId) where.trainerId = trainerId;
    if (memberId) where.memberId = memberId;
    if (activeOnly) where.isActive = true;

    const plans = await prisma.dietPlan.findMany({
      where,
      include: {
        meals: { orderBy: { order: "asc" } },
        trainer: { include: { user: { select: { name: true } } } },
        member: { include: { user: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: plans });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch diet plans" }, { status: 500 });
  }
}

// POST /api/diet-plans
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trainerId, memberId, name, description, startDate, endDate, totalCalories, meals } = body;

    const plan = await prisma.dietPlan.create({
      data: {
        trainerId,
        memberId,
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        totalCalories,
        meals: {
          create: meals.map((meal: any, index: number) => ({
            name: meal.name,
            time: meal.time || null,
            foods: meal.foods,
            calories: meal.calories || null,
            protein: meal.protein || null,
            carbs: meal.carbs || null,
            fats: meal.fats || null,
            notes: meal.notes || null,
            order: index,
          })),
        },
      },
      include: { meals: true },
    });

    return NextResponse.json({ data: plan }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create diet plan" }, { status: 500 });
  }
}
