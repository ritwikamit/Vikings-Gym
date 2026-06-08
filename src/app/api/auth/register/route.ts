import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password, fitnessGoal, referralCode } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const tenantId = await getTenantId();
    if (!tenantId) {
      return NextResponse.json({ error: "No tenant configured" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email } },
    });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        tenantId,
        email,
        password: hashed,
        name,
        phone: phone || null,
        role: "MEMBER",
        member: {
          create: {
            tenantId,
            fitnessGoal: fitnessGoal || null,
            referralCode: referralCode || `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          },
        },
      },
      include: { member: true },
    });

    return NextResponse.json({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        memberId: user.member?.id,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
