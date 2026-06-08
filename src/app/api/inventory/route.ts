import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

// GET /api/inventory
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const lowStock = searchParams.get("lowStock");

    const tenantId = await requireTenant();

    const where: any = { tenantId };
    if (category) where.category = category;

    const items = await prisma.inventoryItem.findMany({
      where,
      include: {
        transactions: { orderBy: { createdAt: "desc" }, take: 5 },
      },
      orderBy: { name: "asc" },
    });

    let result = items;
    if (lowStock === "true") {
      result = items.filter((item: any) => item.quantity <= item.minQuantity);
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}

// POST /api/inventory
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, description, quantity, minQuantity, price, supplier } = body;
    const tenantId = await requireTenant();

    const item = await prisma.inventoryItem.create({
      data: { tenantId, name, category, description, quantity: quantity || 0, minQuantity: minQuantity || 5, unitPrice: price, supplier },
    });

    return NextResponse.json({ data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}
