import prisma from '@/lib/prisma'
import type { TenantContext } from '@/types'

export async function createAuditLog(
  ctx: TenantContext,
  action: string,
  entity: string,
  entityId?: string,
  details?: Record<string, unknown>,
) {
  try {
    await prisma.auditLog.create({
      data: {
        tenantId: ctx.tenantId,
        userId: ctx.userId,
        action,
        entity,
        entityId,
        details: details ? JSON.stringify(details) : null,
      },
    })
  } catch {
    // audit logs should never break the main flow
  }
}

export async function getAuditLogs(
  tenantId: string,
  params: { page?: number; limit?: number; entity?: string; action?: string },
) {
  const page = params.page || 1
  const limit = params.limit || 50
  const where: Record<string, unknown> = { tenantId }

  if (params.entity) where.entity = params.entity
  if (params.action) where.action = params.action

  const [data, total] = await Promise.all([
    prisma.auditLog.findMany({
      where: where as any,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.auditLog.count({ where: where as any }),
  ])

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
}
