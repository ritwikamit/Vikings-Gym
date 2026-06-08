import prisma from '@/lib/prisma'
import { requirePermission } from '@/lib/permissions'
import { createAuditLog } from '@/services/audit'
import type { TenantContext } from '@/types'
import { UserRole } from '@/types'

export async function checkIn(
  ctx: TenantContext,
  memberId: string,
  method: 'QR' | 'MANUAL' = 'MANUAL',
) {
  requirePermission(ctx.role, 'attendance:write')

  const member = await prisma.member.findFirst({
    where: { id: memberId, tenantId: ctx.tenantId },
    include: { user: { select: { name: true } } },
  })

  if (!member) throw new Error('Member not found')

  const existing = await prisma.attendance.findFirst({
    where: {
      memberId,
      tenantId: ctx.tenantId,
      checkOut: null,
      date: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  })

  if (existing) throw new Error('Already checked in today')

  const attendance = await prisma.attendance.create({
    data: {
      tenantId: ctx.tenantId,
      memberId,
      date: new Date(),
      checkIn: new Date(),
      method,
    },
  })

  await createAuditLog(ctx, 'CHECK_IN', 'attendance', attendance.id, {
    memberId,
    memberName: member.user.name,
  })

  return attendance
}

export async function checkOut(ctx: TenantContext, attendanceId: string) {
  requirePermission(ctx.role, 'attendance:write')

  const attendance = await prisma.attendance.findFirst({
    where: { id: attendanceId, tenantId: ctx.tenantId },
  })

  if (!attendance) throw new Error('Attendance record not found')
  if (attendance.checkOut) throw new Error('Already checked out')

  const now = new Date()
  const duration = Math.round((now.getTime() - attendance.checkIn.getTime()) / 60000)

  const updated = await prisma.attendance.update({
    where: { id: attendanceId },
    data: { checkOut: now, duration },
  })

  await createAuditLog(ctx, 'CHECK_OUT', 'attendance', attendanceId)

  return updated
}

export async function getTodayAttendance(tenantId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return prisma.attendance.findMany({
    where: {
      tenantId,
      date: { gte: today },
    },
    include: {
      member: {
        include: { user: { select: { name: true, avatar: true } } },
      },
    },
    orderBy: { checkIn: 'desc' },
  })
}

export async function getAttendanceReport(
  tenantId: string,
  startDate: Date,
  endDate: Date,
) {
  return prisma.attendance.findMany({
    where: {
      tenantId,
      date: { gte: startDate, lte: endDate },
    },
    include: {
      member: {
        include: { user: { select: { name: true } } },
      },
    },
    orderBy: { date: 'desc' },
  })
}

export async function getMemberAttendance(
  ctx: TenantContext,
  memberId: string,
  page = 1,
  limit = 30,
) {
  if (ctx.role === UserRole.MEMBER && ctx.userId !== memberId) {
    // member can only see their own
    const member = await prisma.member.findUnique({
      where: { userId: ctx.userId },
      select: { id: true },
    })
    if (member?.id !== memberId) throw new Error('Forbidden')
  }

  const where = { memberId, tenantId: ctx.tenantId }

  const [data, total] = await Promise.all([
    prisma.attendance.findMany({
      where,
      orderBy: { date: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.attendance.count({ where }),
  ])

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
}
