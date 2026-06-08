import { ROLE_PERMISSIONS, ROLE_HIERARCHY, UserRole } from '@/types'

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role]
  if (!permissions) return false
  if (permissions.includes('*')) return true

  const [resource, action] = permission.split(':')

  return permissions.some((p) => {
    if (p === permission) return true
    const [pResource, pAction] = p.split(':')
    if (pResource === resource && pAction === '*') return true
    return false
  })
}

export function requirePermission(role: UserRole, permission: string): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Forbidden: Missing permission "${permission}"`)
  }
}

export function isRoleAtLeast(userRole: UserRole, minimumRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole]
}

export function canManageRole(actorRole: UserRole, targetRole: UserRole): boolean {
  return ROLE_HIERARCHY[actorRole] > ROLE_HIERARCHY[targetRole]
}

export function getAccessibleRoles(role: UserRole): UserRole[] {
  const actorLevel = ROLE_HIERARCHY[role]
  return Object.entries(ROLE_HIERARCHY)
    .filter(([, level]) => level < actorLevel)
    .map(([r]) => r as UserRole)
}

export function scopeFilter(role: UserRole, userId: string) {
  if (role === UserRole.SUPER_ADMIN || role === UserRole.GYM_OWNER) return {}
  if (role === UserRole.TRAINER) return { trainerId: userId }
  if (role === UserRole.MEMBER) return { userId }
  return {}
}

export function canAccessUser(actorRole: UserRole, actorUserId: string, targetUserId: string): boolean {
  if (actorRole === UserRole.SUPER_ADMIN) return true
  if (actorRole === UserRole.GYM_OWNER) return true
  return actorUserId === targetUserId
}
