import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColorClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-[#02cc3b]';
    case 'declined':
      return 'bg-[#ff0002]';
    case 'pending':
      return 'bg-[#d3b303]';
    case 'new':
      return 'bg-[#7bb9e8]';
    case 'completed':
      return 'bg-[#d02e2c]';
    default:
      return 'bg-[#7bb9e8]';
  }
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const STATUS_COLOR_MAP: { [key: string]: string } = {
  active: getStatusColorClass('active'),
  declined: getStatusColorClass('declined'),
  pending: getStatusColorClass('pending'),
  new: getStatusColorClass('new'),
  completed: getStatusColorClass('completed')
};
