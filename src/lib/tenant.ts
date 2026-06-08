import { headers } from 'next/headers'
import { cache } from 'react'
import prisma from './prisma'
import type { TenantContext } from '@/types'

export const getTenantId = cache(async (): Promise<string | null> => {
  try {
    const h = await headers()
    const host = h.get('host') || ''
    const slug = h.get('x-tenant-slug') || ''

    if (slug) return slug

    const tenant = await prisma.tenant.findFirst({
      where: {
        OR: [
          { domain: host },
          { domain: host.replace(/^www\./, '') },
        ],
      },
      select: { id: true },
    })

    if (tenant?.id) return tenant.id

    // Fallback: single-tenant mode — return the first tenant
    const first = await prisma.tenant.findFirst({ select: { id: true } })
    return first?.id || null
  } catch {
    return null
  }
})

export async function requireTenant(): Promise<string> {
  const tenantId = await getTenantId()
  if (!tenantId) throw new Error('Tenant not found')
  return tenantId
}

export async function getTenantContext(): Promise<TenantContext | null> {
  try {
    const h = await headers()
    const tenantId = await requireTenant()
    const userId = h.get('x-user-id') || ''
    const role = (h.get('x-user-role') || 'MEMBER') as TenantContext['role']

    if (!userId) return null

    return { tenantId, userId, role }
  } catch {
    return null
  }
}

export async function requireTenantContext(): Promise<TenantContext> {
  const ctx = await getTenantContext()
  if (!ctx) throw new Error('Unauthorized: No tenant context')
  return ctx
}

export function withTenant<T extends { tenantId: string }>(data: T, tenantId: string): T {
  return { ...data, tenantId }
}

export function createTenantFilter(tenantId: string) {
  return { tenantId }
}
