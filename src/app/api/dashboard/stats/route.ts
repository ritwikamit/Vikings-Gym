import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";

function emptyDashboardData() {
  const now = new Date();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthlyRevenue = Array.from({length:12},(_,i)=>{
    const m = (now.getMonth()-11+i+12)%12;
    return { month: months[m], revenue: 0 };
  });
  const newMembersMonthly = Array.from({length:6},(_,i)=>{
    const m = (now.getMonth()-5+i+12)%12;
    return { month: months[m], members: 0 };
  });
  return {
    stats: {
      totalMembers:0, activeMembers:0, expiredMembers:0, expiringMembers:0,
      revenueThisMonth:0, revenueThisYear:0, attendanceToday:0,
      trainersCount:0, newMembersThisMonth:0, totalLeads:0,
    },
    charts: {
      monthlyRevenue,
      newMembersMonthly,
      membershipDistribution: [
        { name: "Monthly", value: 0 },
        { name: "Quarterly", value: 0 },
        { name: "Half-Yearly", value: 0 },
        { name: "Annual", value: 0 },
      ],
    },
  };
}

// GET /api/dashboard/stats
export async function GET() {
  try {
    const tenantId = await getTenantId();
    const now = new Date();
    if (!tenantId) {
      return NextResponse.json({ data: emptyDashboardData() });
    }
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [
      totalMembers,
      activeMembers,
      expiredMembers,
      expiringMembers,
      revenueThisMonth,
      revenueThisYear,
      attendanceToday,
      trainersCount,
      newMembersThisMonth,
      totalLeads,
    ] = await Promise.all([
      prisma.member.count({ where: { tenantId } }),
      prisma.membership.count({ where: { tenantId, status: "ACTIVE" } }),
      prisma.membership.count({ where: { tenantId, status: "EXPIRED" } }),
      prisma.membership.count({
        where: {
          tenantId,
          status: "ACTIVE",
          endDate: { gte: now, lte: sevenDaysLater },
        },
      }),
      prisma.payment.aggregate({
        where: { tenantId, status: "PAID", paidAt: { gte: startOfMonth } },
        _sum: { totalAmount: true },
      }),
      prisma.payment.aggregate({
        where: { tenantId, status: "PAID", paidAt: { gte: startOfYear } },
        _sum: { totalAmount: true },
      }),
      prisma.attendance.count({
        where: { tenantId, date: { gte: startOfDay, lte: endOfDay } },
      }),
      prisma.trainer.count({ where: { tenantId } }),
      prisma.member.count({
        where: { tenantId, createdAt: { gte: startOfMonth } },
      }),
      prisma.lead.count({ where: { tenantId, stage: "NEW_LEAD" } }),
    ]);

    // Monthly revenue for chart (last 12 months)
    const monthlyRevenue = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const revenue = await prisma.payment.aggregate({
        where: { tenantId, status: "PAID", paidAt: { gte: monthStart, lte: monthEnd } },
        _sum: { totalAmount: true },
      });
      monthlyRevenue.push({
        month: monthStart.toLocaleDateString("en-US", { month: "short" }),
        revenue: revenue._sum.totalAmount || 0,
      });
    }

    // New members per month (last 6 months)
    const newMembersMonthly = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const count = await prisma.member.count({
        where: { tenantId, createdAt: { gte: monthStart, lte: monthEnd } },
      });
      newMembersMonthly.push({
        month: monthStart.toLocaleDateString("en-US", { month: "short" }),
        members: count,
      });
    }

    // Membership distribution
    const [monthly, quarterly, halfYearly, annual] = await Promise.all([
      prisma.membership.count({ where: { tenantId, status: "ACTIVE", plan: { duration: 1 } } }),
      prisma.membership.count({ where: { tenantId, status: "ACTIVE", plan: { duration: 3 } } }),
      prisma.membership.count({ where: { tenantId, status: "ACTIVE", plan: { duration: 6 } } }),
      prisma.membership.count({ where: { tenantId, status: "ACTIVE", plan: { duration: 12 } } }),
    ]);

    return NextResponse.json({
      data: {
        stats: {
          totalMembers,
          activeMembers,
          expiredMembers,
          expiringMembers,
          revenueThisMonth: revenueThisMonth._sum.totalAmount || 0,
          revenueThisYear: revenueThisYear._sum.totalAmount || 0,
          attendanceToday,
          trainersCount,
          newMembersThisMonth,
          totalLeads,
        },
        charts: {
          monthlyRevenue,
          newMembersMonthly,
          membershipDistribution: [
            { name: "Monthly", value: monthly },
            { name: "Quarterly", value: quarterly },
            { name: "Half-Yearly", value: halfYearly },
            { name: "Annual", value: annual },
          ],
        },
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
