import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { createElement } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(amount: number) {
  return amount.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(date: Date) {
  return format(date, 'dd LLL yyyy');
}

type Length = {
  length: number;
};

export function renderFallbackString(val: string, { length }: Length) {
  if (val.length > 0) return val;
  return createElement(
    'span',
    { className: 'font-semibold text-nowrap ' },
    Array.from({ length }).fill('-').join(''),
  );
}
