import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { requireTenant } from "@/lib/tenant";

// GET /api/members - List all members
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const tenantId = await requireTenant();

    const where: any = { tenantId };

    if (search) {
      where.user = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } },
        ],
      };
    }

    if (status) {
      where.memberships = {
        some: { status: status },
      };
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true, phone: true, avatar: true, isActive: true } },
          memberships: {
            where: { status: "ACTIVE" },
            include: { plan: true },
            take: 1,
            orderBy: { endDate: "desc" },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.member.count({ where }),
    ]);

    return NextResponse.json({
      data: members,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

// POST /api/members - Create new member
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password, dateOfBirth, gender, address, emergencyContact, emergencyPhone, weight, height, fitnessGoal } = body;
    const tenantId = await requireTenant();

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({ where: { email, tenantId } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password || "vikings@123", 12);
    const qrCode = `VGM-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const referralCode = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "MEMBER",
        tenantId,
        member: {
          create: {
            tenantId,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            gender: gender || null,
            address: address || null,
            emergencyContact: emergencyContact || null,
            emergencyPhone: emergencyPhone || null,
            weight: weight ? parseFloat(weight) : null,
            height: height ? parseFloat(height) : null,
            fitnessGoal: fitnessGoal || null,
            qrCode,
            referralCode,
          },
        },
      },
      include: { member: true },
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}
