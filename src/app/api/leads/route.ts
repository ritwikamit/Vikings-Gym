import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/leads
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get("stage");
    const source = searchParams.get("source");

    const where: any = {};
    if (stage) where.stage = stage;
    if (source) where.source = source;

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: leads });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

// POST /api/leads
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, source, notes } = body;

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        source: source || "WALK_IN",
        stage: "NEW_LEAD",
        notes: notes || null,
      },
    });

    return NextResponse.json({ data: lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
