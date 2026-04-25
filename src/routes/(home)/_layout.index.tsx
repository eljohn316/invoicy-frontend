import { createFileRoute, Link } from '@tanstack/react-router';
import InvoiceEmpty from '@/assets/invoice-empty.svg?react';
import { useInvoices, invoicesQueryOptions } from '@/features/invoices/hooks/use-invoices';
import {
  InvoiceListItem,
  InvoiceListItemSkeleton,
} from '@/features/invoices/components/invoice-list-item';
import { Feedback, FeedbackTitle, FeedbackDescription } from '@/components/feedback';

export const Route = createFileRoute('/(home)/_layout/')({
  loaderDeps: ({ search }) => {
    return { status: search.status };
  },
  loader: ({ context, deps }) => {
    const { queryClient } = context;
    const { status } = deps;
    return queryClient.ensureQueryData(invoicesQueryOptions({ status }));
  },
  component: RouteComponent,
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  const { data: invoices } = useInvoices();

  if (invoices.length === 0) {
    return (
      <Feedback className="flex flex-col items-center">
        <InvoiceEmpty />
        <FeedbackTitle className="mt-4">No invoices yet</FeedbackTitle>
        <FeedbackDescription className="mt-2 max-w-sm">
          Add an invoice by clicking the{' '}
          <span className="text-primary-500 font-semibold">New Invoice</span> button and get
          started.
        </FeedbackDescription>
      </Feedback>
    );
  }

  return (
    <div className="divide-y divide-gray-200 *:py-4 *:first:pt-0 *:last:pb-0">
      {invoices.map((invoice) => (
        <Link
          key={invoice.id}
          to="/invoices/$invoiceId"
          params={{ invoiceId: invoice.id }}
          className="block">
          <InvoiceListItem key={invoice.id} invoice={invoice} />
        </Link>
      ))}
    </div>
  );
}

function PendingComponent() {
  return (
    <div className="divide-y divide-gray-200 *:py-4 *:first:pt-0 *:last:pb-0">
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
      <InvoiceListItemSkeleton />
    </div>
  );
}

function ErrorComponent() {
  return (
    <Feedback>
      <FeedbackTitle>Something went wrong</FeedbackTitle>
      <FeedbackDescription>An error occurred while fetching your invoice data</FeedbackDescription>
    </Feedback>
  );
}
