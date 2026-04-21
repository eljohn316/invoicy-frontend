import { format } from 'date-fns';
import type { InvoiceListItem } from '@/features/invoices/types/invoice';
import { InvoiceStatus } from '@/features/invoices/components/invoice-status';
import { Skeleton } from '@/components/skeleton';
import { formatAmount } from '@/lib/utils';

type InvoiceListItemProps = {
  invoice: InvoiceListItem;
};

const formatDate = (date: Date) => {
  return format(date, 'dd LLL yyyy');
};

export function InvoiceListItem({ invoice }: InvoiceListItemProps) {
  return (
    <div className="group space-y-3">
      <div className="flex items-center gap-x-2">
        <span className="rounded-sm bg-gray-200 px-1.5 py-1 text-xs leading-none font-medium text-gray-900 uppercase">
          Invoice ID
        </span>
        <span className="text-primary-500 font-semibold underline-offset-2 group-hover:underline">
          {invoice.id}
        </span>
      </div>
      <div className="xs:flex xs:items-center xs:justify-between xs:gap-x-4 xs:space-y-0 space-y-3">
        <div className="flex-1">
          <p className="font-medium text-gray-900">{invoice.clientName}</p>
          <div className="flex items-baseline">
            <p className="text-sm text-gray-600">Due {formatDate(invoice.paymentDue)}</p>
            <p className="mx-2 text-gray-300">|</p>
            <p className="text-sm text-gray-600">&pound; {formatAmount(invoice.total)}</p>
          </div>
        </div>
        <InvoiceStatus status={invoice.status} className="flex-none" />
      </div>
    </div>
  );
}

export function InvoiceListItemSkeleton() {
  return (
    <div className="group space-y-3">
      <Skeleton className="h-5 max-w-64" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
