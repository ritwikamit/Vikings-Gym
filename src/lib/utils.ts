import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'success':
      return 'text-green-500 bg-green-500/10'
    case 'pending':
    case 'processing':
      return 'text-yellow-500 bg-yellow-500/10'
    case 'expired':
    case 'failed':
    case 'cancelled':
      return 'text-red-500 bg-red-500/10'
    default:
      return 'text-gray-500 bg-gray-500/10'
  }
}

export function getInitials(name: string) {
  if (!name) return 'U'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculateBMI(weightKg: number, heightCm: number) {
  if (!weightKg || !heightCm) return 0
  const heightM = heightCm / 100
  return Number((weightKg / (heightM * heightM)).toFixed(1))
}

export function getBMICategory(bmi: number) {
  if (!bmi) return 'Unknown'
  if (bmi < 18.5) return 'Underweight'
  if (bmi >= 18.5 && bmi < 25) return 'Normal'
  if (bmi >= 25 && bmi < 30) return 'Overweight'
  return 'Obese'
}
