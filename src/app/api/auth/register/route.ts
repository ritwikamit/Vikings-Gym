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

    let tenantId = await getTenantId();
    
    // Aggressive fallback if getTenantId still returns null
    if (!tenantId) {
      const firstTenant = await prisma.tenant.findFirst();
      if (firstTenant) {
        tenantId = firstTenant.id;
      } else {
        const newTenant = await prisma.tenant.create({
          data: {
            name: "Vikings Gym",
            slug: "vikings-gym-fallback-" + Math.random().toString(36).substring(2, 6),
          }
        });
        tenantId = newTenant.id;
      }
    }

    if (!tenantId) {
      return NextResponse.json({ error: "No tenant configured and fallback failed." }, { status: 500 });
    }

    const existing = await prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email } },
    });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    
    // Generate a unique referral code for the NEW member
    const newMemberReferralCode = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

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
            referralCode: newMemberReferralCode,
          },
        },
      },
      include: { member: true },
    });

    // If a referral code was provided, create a Referral record
    if (referralCode && referralCode.trim() !== "") {
      const referrerMember = await prisma.member.findUnique({
        where: { referralCode: referralCode.trim() },
      });

      if (referrerMember) {
        await prisma.referral.create({
          data: {
            tenantId,
            referrerId: referrerMember.id,
            referredId: user.member!.id,
            referralCode: referralCode.trim(),
            status: "PENDING",
          },
        });
      }
    }

    return NextResponse.json({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        memberId: user.member?.id,
      },
    });
   } catch (error) {
     const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
     console.error("Register error:", errorMsg);
     return NextResponse.json({ error: errorMsg || "Registration failed" }, { status: 500 });
   }
}
