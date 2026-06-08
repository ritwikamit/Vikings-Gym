import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/trainers
export async function GET() {
  try {
    const trainers = await prisma.trainer.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, avatar: true, isActive: true } },
        clients: {
          include: { user: { select: { name: true } } },
        },
        _count: {
          select: {
            clients: true,
            workoutPlans: true,
            dietPlans: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: trainers });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return NextResponse.json({ error: "Failed to fetch trainers" }, { status: 500 });
  }
}

// POST /api/trainers
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password, experience, certifications, specialization, salary, bio } = body;
    const bcrypt = await import("bcryptjs");

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password || "trainer@123", 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "TRAINER",
        trainer: {
          create: {
            experience: experience || 0,
            certifications: certifications || [],
            specialization: specialization || [],
            salary: salary || null,
            bio: bio || null,
          },
        },
      },
      include: { trainer: true },
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    console.error("Error creating trainer:", error);
    return NextResponse.json({ error: "Failed to create trainer" }, { status: 500 });
  }
}
