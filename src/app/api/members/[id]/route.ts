import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/members/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, avatar: true, role: true, isActive: true, createdAt: true } },
        memberships: { include: { plan: true }, orderBy: { createdAt: "desc" } },
        attendance: { orderBy: { date: "desc" }, take: 30 },
        payments: { orderBy: { createdAt: "desc" }, take: 20 },
        workoutPlans: { include: { exercises: true }, where: { isActive: true } },
        dietPlans: { include: { meals: true }, where: { isActive: true } },
        progressRecords: { orderBy: { date: "desc" }, take: 12 },
        trainer: { include: { user: { select: { name: true } } } },
      },
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ data: member });
  } catch (error) {
    console.error("Error fetching member:", error);
    return NextResponse.json({ error: "Failed to fetch member" }, { status: 500 });
  }
}

// PUT /api/members/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, phone, email, dateOfBirth, gender, address, emergencyContact, emergencyPhone, weight, height, fitnessGoal } = body;

    const member = await prisma.member.update({
      where: { id },
      data: {
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender: gender || undefined,
        address,
        emergencyContact,
        emergencyPhone,
        weight: weight ? parseFloat(weight) : undefined,
        height: height ? parseFloat(height) : undefined,
        fitnessGoal,
        user: {
          update: {
            name,
            phone,
            email,
          },
        },
      },
      include: { user: true },
    });

    return NextResponse.json({ data: member });
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

// DELETE /api/members/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const member = await prisma.member.findUnique({ where: { id } });
    
    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Soft delete — deactivate user
    await prisma.user.update({
      where: { id: member.userId },
      data: { isActive: false },
    });

    return NextResponse.json({ message: "Member deactivated successfully" });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
