import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { Currency } from '@domain/funds/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCoin(currency: Currency) {
  return currency === 'EUR' ? '€' : '$';
}
