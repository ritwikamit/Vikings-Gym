export type TenantContext = {
  tenantId: string
  userId: string
  role: UserRole
}

export type PaginationParams = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type PaginatedResult<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  GYM_OWNER = 'GYM_OWNER',
  RECEPTIONIST = 'RECEPTIONIST',
  TRAINER = 'TRAINER',
  MEMBER = 'MEMBER',
}

export enum MembershipStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum LeadStage {
  NEW_LEAD = 'NEW_LEAD',
  CONTACTED = 'CONTACTED',
  TRIAL_SCHEDULED = 'TRIAL_SCHEDULED',
  TRIAL_COMPLETED = 'TRIAL_COMPLETED',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST',
}

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 100,
  [UserRole.GYM_OWNER]: 80,
  [UserRole.RECEPTIONIST]: 60,
  [UserRole.TRAINER]: 40,
  [UserRole.MEMBER]: 20,
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.SUPER_ADMIN]: ['*'],
  [UserRole.GYM_OWNER]: [
    'members:read', 'members:write', 'members:delete',
    'memberships:read', 'memberships:write', 'memberships:delete',
    'trainers:read', 'trainers:write', 'trainers:delete',
    'payments:read', 'payments:write', 'payments:refund',
    'attendance:read', 'attendance:write',
    'reports:read', 'reports:export',
    'inventory:read', 'inventory:write',
    'leads:read', 'leads:write',
    'settings:read', 'settings:write',
    'announcements:read', 'announcements:write',
    'coupons:read', 'coupons:write',
    'audit:read',
  ],
  [UserRole.RECEPTIONIST]: [
    'members:read', 'members:write',
    'memberships:read',
    'attendance:read', 'attendance:write',
    'payments:read', 'payments:write',
    'leads:read', 'leads:write',
  ],
  [UserRole.TRAINER]: [
    'members:read',
    'workout:read', 'workout:write',
    'diet:read', 'diet:write',
    'progress:read', 'progress:write',
    'attendance:read',
  ],
  [UserRole.MEMBER]: [
    'profile:read', 'profile:write',
    'attendance:read',
    'workout:read',
    'diet:read',
    'progress:read',
    'payments:read',
  ],
}
