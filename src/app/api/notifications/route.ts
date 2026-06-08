import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/notifications
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    const where: any = {};
    if (userId) where.userId = userId;
    if (unreadOnly) where.read = false;

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const unreadCount = await prisma.notification.count({
      where: { ...where, read: false },
    });

    return NextResponse.json({ data: notifications, unreadCount });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

// POST /api/notifications
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, message, type, channel } = body;

    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type: type || "GENERAL",
        channel: channel || "IN_APP",
        sentAt: new Date(),
      },
    });

    return NextResponse.json({ data: notification }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
  }
}
