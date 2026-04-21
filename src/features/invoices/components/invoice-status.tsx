import { cn } from '@/lib/utils';
import type { Status } from '@/features/invoices/types/invoice';

type InvoiceStatusProps = {
  status: Status;
  className?: string;
};

const variants = {
  paid: 'bg-emerald-500 text-emerald-50',
  pending: 'bg-amber-500 text-amber-50',
  draft: 'bg-bunker-200 text-bunker-900',
};

export function InvoiceStatus({ status, className }: InvoiceStatusProps) {
  return (
    <span
      className={cn(
        'flex h-8 w-20 items-center justify-center rounded-md text-xs leading-0 font-semibold uppercase',
        variants[status],
        className,
      )}>
      {status}
    </span>
  );
}
