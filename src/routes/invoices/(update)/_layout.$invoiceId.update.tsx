import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/button';
import { Feedback, FeedbackDescription, FeedbackTitle } from '@/components/feedback';
import { UpdateInvoiceForm } from '@/features/invoices/components/invoice-form';
import { invoiceQueryOptions, useInvoice } from '@/features/invoices/hooks/use-invoice';
import { InvoiceFormSkeleton } from '@/features/invoices/components/invoice-form-skeleton';

export const Route = createFileRoute('/invoices/(update)/_layout/$invoiceId/update')({
  head: ({ params }) => ({
    meta: [{ title: `Update invoice - ${params.invoiceId} | Invoice App` }],
  }),
  loader: ({ context, params }) => {
    const { queryClient } = context;
    const { invoiceId } = params;
    return queryClient.ensureQueryData(invoiceQueryOptions(invoiceId));
  },
  component: RouteComponent,
  pendingComponent: PendingComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  const { invoiceId } = Route.useParams();
  const { data: invoice } = useInvoice(invoiceId);

  return <UpdateInvoiceForm invoice={invoice} />;
}

function PendingComponent() {
  return <InvoiceFormSkeleton />;
}

function NotFoundComponent() {
  const navigate = useNavigate();
  const { invoiceId } = Route.useParams();

  return (
    <Feedback className="space-y-0">
      <FeedbackTitle>Invoice not found</FeedbackTitle>
      <FeedbackDescription className="mt-1">
        We could not find any Invoice with an ID of{' '}
        <span className="text-primary-500">{invoiceId}</span>
      </FeedbackDescription>
      <Button variant="primary" className="mt-6" onClick={() => navigate({ to: '/' })}>
        Go to Invoices
      </Button>
    </Feedback>
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
