import { createFileRoute, Link } from '@tanstack/react-router';
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
