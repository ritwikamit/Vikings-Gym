import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'

export function success<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data } satisfies ApiResponse<T>, { status })
}

export function created<T>(data: T) {
  return success(data, 201)
}

export function error(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message } satisfies ApiResponse, { status })
}

export function unauthorized(message = 'Unauthorized') {
  return error(message, 401)
}

export function forbidden(message = 'Forbidden') {
  return error(message, 403)
}

export function notFound(message = 'Not found') {
  return error(message, 404)
}

export function validationError(errors: Record<string, string[]>) {
  return NextResponse.json(
    { success: false, error: 'Validation failed', data: errors } satisfies ApiResponse,
    { status: 422 },
  )
}

export function paginated<T>(data: T[], total: number, page: number, limit: number) {
  return NextResponse.json({
    success: true,
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  })
}
