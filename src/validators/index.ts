import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const memberSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string().min(6),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  weight: z.coerce.number().positive().optional(),
  height: z.coerce.number().positive().optional(),
  fitnessGoal: z.string().optional(),
})

export const trainerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string().min(6),
  experience: z.coerce.number().int().min(0),
  certifications: z.string().min(1),
  specialization: z.string().min(1),
  salary: z.coerce.number().positive().optional(),
  bio: z.string().optional(),
})

export const membershipPlanSchema = z.object({
  name: z.string().min(2).max(100),
  duration: z.coerce.number().int().positive(),
  price: z.coerce.number().positive(),
  discountPrice: z.coerce.number().positive().optional(),
  description: z.string().optional(),
  features: z.string(),
  isPopular: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
})

export const assignMembershipSchema = z.object({
  memberId: z.string(),
  planId: z.string(),
  startDate: z.string(),
  autoRenew: z.boolean().default(false),
  notes: z.string().optional(),
})

export const attendanceSchema = z.object({
  memberId: z.string(),
  method: z.enum(['QR', 'MANUAL']).default('MANUAL'),
})

export const checkoutSchema = z.object({
  attendanceId: z.string(),
})

export const paymentSchema = z.object({
  memberId: z.string(),
  membershipId: z.string().optional(),
  amount: z.coerce.number().positive(),
  method: z.enum(['CASH', 'UPI', 'CARD', 'NET_BANKING', 'RAZORPAY']),
  description: z.string().optional(),
  couponCode: z.string().optional(),
})

export const leadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(15),
  email: z.string().email().optional().or(z.literal('')),
  source: z.string().default('WALK_IN'),
  notes: z.string().optional(),
})

export const workoutPlanSchema = z.object({
  memberId: z.string(),
  name: z.string().min(2).max(200),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  exercises: z.array(z.object({
    name: z.string(),
    sets: z.coerce.number().int().positive(),
    reps: z.coerce.number().int().positive(),
    restTime: z.coerce.number().int().default(60),
    weight: z.coerce.number().optional(),
    notes: z.string().optional(),
    dayOfWeek: z.coerce.number().int().min(0).max(6).optional(),
    order: z.coerce.number().int().default(0),
  })).min(1),
})

export const dietPlanSchema = z.object({
  memberId: z.string(),
  name: z.string().min(2).max(200),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  totalCalories: z.coerce.number().int().positive().optional(),
  meals: z.array(z.object({
    name: z.string(),
    time: z.string().optional(),
    foods: z.string(),
    calories: z.coerce.number().int().optional(),
    protein: z.coerce.number().optional(),
    carbs: z.coerce.number().optional(),
    fats: z.coerce.number().optional(),
    notes: z.string().optional(),
    order: z.coerce.number().int().default(0),
  })).min(1),
})

export const progressSchema = z.object({
  memberId: z.string(),
  weight: z.coerce.number().positive().optional(),
  chest: z.coerce.number().positive().optional(),
  waist: z.coerce.number().positive().optional(),
  arms: z.coerce.number().positive().optional(),
  thighs: z.coerce.number().positive().optional(),
  hips: z.coerce.number().positive().optional(),
  bodyFatPercent: z.coerce.number().positive().optional(),
  notes: z.string().optional(),
})

export const couponSchema = z.object({
  code: z.string().min(3).max(50).transform(s => s.toUpperCase()),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']),
  discountValue: z.coerce.number().positive(),
  maxUses: z.coerce.number().int().positive().optional(),
  minAmount: z.coerce.number().positive().optional(),
  maxDiscount: z.coerce.number().positive().optional(),
  validFrom: z.string(),
  validUntil: z.string(),
})

export const inventorySchema = z.object({
  name: z.string().min(2).max(200),
  category: z.string().min(1),
  description: z.string().optional(),
  quantity: z.coerce.number().int().min(0).default(0),
  minQuantity: z.coerce.number().int().min(0).default(5),
  unitPrice: z.coerce.number().positive().optional(),
  sellingPrice: z.coerce.number().positive().optional(),
  supplier: z.string().optional(),
})

export const tenantSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens'),
  domain: z.string().optional(),
  brandColor: z.string().default('#E11D48'),
  ownerName: z.string().min(2),
  ownerEmail: z.string().email(),
  ownerPhone: z.string().min(10),
  ownerPassword: z.string().min(6),
})
