import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateROI(hoursPerWeek: number, hourlyRate: number = 25) {
  const efficiencyGain = 0.7 // 70% efficiency improvement
  const weeklySavings = hoursPerWeek * hourlyRate * efficiencyGain
  const annualSavings = weeklySavings * 52
  const hoursFreed = hoursPerWeek * efficiencyGain

  return {
    weeklySavings: Math.round(weeklySavings),
    annualSavings: Math.round(annualSavings),
    hoursFreed: Math.round(hoursFreed)
  }
}

export function formatCurrency(amount: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}