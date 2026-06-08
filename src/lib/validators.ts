import { z } from "zod";

// ============================================
// AUTH VALIDATORS
// ============================================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// ============================================
// MEMBER VALIDATORS
// ============================================

export const memberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
  fitnessGoal: z.string().optional(),
});

// ============================================
// MEMBERSHIP PLAN VALIDATORS
// ============================================

export const membershipPlanSchema = z.object({
  name: z.string().min(2, "Plan name is required"),
  duration: z.number().int().positive("Duration must be positive"),
  price: z.number().positive("Price must be positive"),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

export const assignMembershipSchema = z.object({
  memberId: z.string().min(1, "Member is required"),
  planId: z.string().min(1, "Plan is required"),
  startDate: z.string().min(1, "Start date is required"),
  paymentMethod: z.enum(["CASH", "UPI", "CARD", "NET_BANKING", "RAZORPAY"]).default("CASH"),
});

// ============================================
// TRAINER VALIDATORS
// ============================================

export const trainerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  experience: z.number().int().min(0).default(0),
  certifications: z.array(z.string()).default([]),
  specialization: z.array(z.string()).default([]),
  salary: z.number().positive().optional(),
  bio: z.string().optional(),
});

// ============================================
// WORKOUT PLAN VALIDATORS
// ============================================

export const workoutExerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  sets: z.number().int().positive("Sets must be positive"),
  reps: z.number().int().positive("Reps must be positive"),
  restTime: z.number().int().min(0).default(60),
  weight: z.number().optional(),
  notes: z.string().optional(),
  dayOfWeek: z.number().int().min(0).max(6).optional(),
  order: z.number().int().default(0),
});

export const workoutPlanSchema = z.object({
  memberId: z.string().min(1, "Member is required"),
  name: z.string().min(2, "Plan name is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  exercises: z.array(workoutExerciseSchema).min(1, "At least one exercise is required"),
});

// ============================================
// DIET PLAN VALIDATORS
// ============================================

export const dietMealSchema = z.object({
  name: z.string().min(1, "Meal name is required"),
  time: z.string().optional(),
  foods: z.string().min(1, "Foods are required"),
  calories: z.number().int().positive().optional(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fats: z.number().optional(),
  notes: z.string().optional(),
  order: z.number().int().default(0),
});

export const dietPlanSchema = z.object({
  memberId: z.string().min(1, "Member is required"),
  name: z.string().min(2, "Plan name is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  totalCalories: z.number().int().positive().optional(),
  meals: z.array(dietMealSchema).min(1, "At least one meal is required"),
});

// ============================================
// PROGRESS TRACKING VALIDATORS
// ============================================

export const progressSchema = z.object({
  memberId: z.string().min(1, "Member is required"),
  weight: z.number().positive().optional(),
  chest: z.number().positive().optional(),
  waist: z.number().positive().optional(),
  arms: z.number().positive().optional(),
  thighs: z.number().positive().optional(),
  hips: z.number().positive().optional(),
  bmi: z.number().positive().optional(),
  bodyFatPercent: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

// ============================================
// LEAD VALIDATORS
// ============================================

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  source: z.enum(["WALK_IN", "REFERRAL", "SOCIAL_MEDIA", "WEBSITE", "PHONE", "OTHER"]).default("WALK_IN"),
  stage: z.enum(["NEW_LEAD", "CONTACTED", "TRIAL_SCHEDULED", "TRIAL_COMPLETED", "CONVERTED", "LOST"]).default("NEW_LEAD"),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
});

// ============================================
// INVENTORY VALIDATORS
// ============================================

export const inventoryItemSchema = z.object({
  name: z.string().min(2, "Item name is required"),
  category: z.enum(["SUPPLEMENT", "MERCHANDISE", "ACCESSORY", "EQUIPMENT"]),
  description: z.string().optional(),
  quantity: z.number().int().min(0).default(0),
  minQuantity: z.number().int().min(0).default(5),
  price: z.number().positive().optional(),
  supplier: z.string().optional(),
});

// ============================================
// COUPON VALIDATORS
// ============================================

export const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.number().positive("Discount must be positive"),
  maxUses: z.number().int().positive().optional(),
  minAmount: z.number().positive().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().min(1, "Expiry date is required"),
});

// ============================================
// CONTACT FORM VALIDATOR
// ============================================

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type MemberInput = z.infer<typeof memberSchema>;
export type MembershipPlanInput = z.infer<typeof membershipPlanSchema>;
export type AssignMembershipInput = z.infer<typeof assignMembershipSchema>;
export type TrainerInput = z.infer<typeof trainerSchema>;
export type WorkoutPlanInput = z.infer<typeof workoutPlanSchema>;
export type DietPlanInput = z.infer<typeof dietPlanSchema>;
export type ProgressInput = z.infer<typeof progressSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type InventoryItemInput = z.infer<typeof inventoryItemSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
