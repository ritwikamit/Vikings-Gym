import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/cron/membership-expiry - Check and notify expiring memberships
export async function GET(request: Request) {
  try {
    // Verify cron secret (for production)
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const notifications: any[] = [];

    // Check 7 days, 3 days, 1 day, and 0 days before expiry
    const intervals = [
      { days: 7, message: "Your membership expires in 7 days. Renew now to continue your fitness journey!" },
      { days: 3, message: "Your membership expires in 3 days. Don't miss your workouts — renew today!" },
      { days: 1, message: "Your membership expires tomorrow! Renew now to avoid interruption." },
      { days: 0, message: "Your membership has expired today. Renew now to continue accessing Vikings Gym!" },
    ];

    for (const interval of intervals) {
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + interval.days);
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      const expiringMemberships = await prisma.membership.findMany({
        where: {
          status: "ACTIVE",
          endDate: { gte: startOfDay, lte: endOfDay },
        },
        include: {
          member: { include: { user: true } },
          plan: true,
        },
      });

      for (const membership of expiringMemberships) {
        // Check if notification already sent today for this membership
        const existing = await prisma.notification.findFirst({
          where: {
            userId: membership.member.userId,
            type: "MEMBERSHIP_EXPIRY",
            createdAt: { gte: startOfDay, lte: endOfDay },
          },
        });

        if (!existing) {
          const notification = await prisma.notification.create({
            data: {
              userId: membership.member.userId,
              tenantId: membership.member.tenantId,
              title: interval.days === 0 ? "Membership Expired" : `Membership Expiring in ${interval.days} Day${interval.days > 1 ? "s" : ""}`,
              message: interval.message,
              type: "MEMBERSHIP_EXPIRY",
              channel: "IN_APP",
              sentAt: new Date(),
            },
          });
          notifications.push(notification);

          // TODO: Send email notification
          // await sendEmail(membership.member.user.email, notification.title, notification.message);

          // TODO: Send WhatsApp notification (placeholder)
          // await sendWhatsApp(membership.member.user.phone, notification.message);
        }
      }

      // Expire memberships that have passed end date
      if (interval.days === 0) {
        await prisma.membership.updateMany({
          where: {
            status: "ACTIVE",
            endDate: { lt: startOfDay },
          },
          data: { status: "EXPIRED" },
        });
      }
    }

    // Birthday reminders
    const today = new Date();
    const birthdayMembers = await prisma.member.findMany({
      where: {
        dateOfBirth: {
          not: null,
        },
      },
      include: { user: true },
    });

    for (const member of birthdayMembers) {
      if (member.dateOfBirth) {
        const bday = new Date(member.dateOfBirth);
        if (bday.getMonth() === today.getMonth() && bday.getDate() === today.getDate()) {
          const existing = await prisma.notification.findFirst({
            where: {
              userId: member.userId,
              type: "BIRTHDAY",
              createdAt: { gte: new Date(today.setHours(0, 0, 0, 0)) },
            },
          });

          if (!existing) {
            await prisma.notification.create({
              data: {
                userId: member.userId,
                tenantId: member.tenantId,
                title: "🎂 Happy Birthday!",
                message: `Happy Birthday, ${member.user.name}! Wishing you a great year ahead. Keep crushing your fitness goals! 💪`,
                type: "BIRTHDAY",
                channel: "IN_APP",
                sentAt: new Date(),
              },
            });
          }
        }
      }
    }

    return NextResponse.json({
      message: "Cron job completed",
      notificationsSent: notifications.length,
    });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
