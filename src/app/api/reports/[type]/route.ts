import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

// GET /api/reports/[type]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
    const end = endDate ? new Date(endDate) : new Date();
    const tenantId = await requireTenant();

    switch (type) {
      case "revenue": {
        const payments = await prisma.payment.findMany({
          where: {
            status: "PAID",
            tenantId,
            paidAt: { gte: start, lte: end },
          },
          include: { member: { include: { user: { select: { name: true } } } } },
          orderBy: { paidAt: "desc" },
        });

        const totalRevenue = payments.reduce((sum: number, p: any) => sum + p.amount, 0);
        const byMethod = payments.reduce((acc: Record<string, number>, p: any) => {
          acc[p.method] = (acc[p.method] || 0) + p.amount;
          return acc;
        }, {});

        return NextResponse.json({ data: { payments, totalRevenue, byMethod } });
      }

      case "attendance": {
        const attendance = await prisma.attendance.findMany({
          where: { date: { gte: start, lte: end }, tenantId },
          include: { member: { include: { user: { select: { name: true } } } } },
          orderBy: { date: "desc" },
        });

        const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        const avgDaily = attendance.length / Math.max(totalDays, 1);

        return NextResponse.json({ data: { attendance, totalVisits: attendance.length, avgDaily } });
      }

      case "membership": {
        const [active, expired, frozen, cancelled, total] = await Promise.all([
          prisma.membership.count({ where: { status: "ACTIVE", tenantId } }),
          prisma.membership.count({ where: { status: "EXPIRED", tenantId } }),
          prisma.membership.count({ where: { status: "FROZEN", tenantId } }),
          prisma.membership.count({ where: { status: "CANCELLED", tenantId } }),
          prisma.membership.count({ where: { tenantId } }),
        ]);

        const byPlan = await prisma.membership.groupBy({
          by: ["planId"],
          where: { status: "ACTIVE", tenantId },
          _count: true,
        });

        return NextResponse.json({
          data: { active, expired, frozen, cancelled, total, byPlan },
        });
      }

      case "trainer": {
        const trainers = await prisma.trainer.findMany({
          where: { tenantId },
          include: {
            user: { select: { name: true } },
            _count: { select: { clients: true, workoutPlans: true, dietPlans: true } },
          },
        });

        return NextResponse.json({ data: { trainers } });
      }

      default:
        return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
