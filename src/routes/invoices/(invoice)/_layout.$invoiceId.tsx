import { Fragment } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { cn, formatAmount, formatDate } from '@/lib/utils';
import { InvoiceStatus } from '@/features/invoices/components/invoice-status';
import type { Status } from '@/features/invoices/types/invoice';
import { useInvoice, invoiceQueryOptions } from '@/features/invoices/hooks/use-invoice';
import { useUpdateInvoice } from '@/features/invoices/hooks/use-update-invoice';
import { Button } from '@/components/button';
import { Skeleton } from '@/components/skeleton';
import { Feedback, FeedbackDescription, FeedbackTitle } from '@/components/feedback';
import { Spinner } from '@/components/spinner';
import { InvoiceDeleteDialog } from '@/features/invoices/components/invoice-delete-dialog';

export const Route = createFileRoute('/invoices/(invoice)/_layout/$invoiceId')({
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
  const { isPending, mutate: updateInvoice } = useUpdateInvoice(invoiceId);

  function onUpdate(status: Status) {
    updateInvoice({ status });
  }

  return (
    <div className="divide-y divide-gray-200 *:py-8 *:first:pt-0 *:last:pb-0">
      <div className="flex items-center">
        <InvoiceStatus status={invoice.status as Status} />
        <Link
          to="/invoices/$invoiceId/update"
          params={{ invoiceId: invoice.id }}
          className="link link-ghost ml-auto">
          Edit
        </Link>
        {invoice.status === 'pending' && (
          <Button
            variant="primary"
            className="relative ml-3"
            onClick={() => onUpdate('paid')}
            disabled={isPending}>
            {isPending && (
              <span className="absolute inset-0 inline-flex items-center justify-center">
                <Spinner />
              </span>
            )}
            <span className={cn(isPending && 'invisible')}>Mark as paid</span>
          </Button>
        )}
        {invoice.status === 'paid' && (
          <Button
            variant="secondary"
            className="relative ml-3"
            onClick={() => onUpdate('pending')}
            disabled={isPending}>
            {isPending && (
              <span className="absolute inset-0 inline-flex items-center justify-center">
                <Spinner />
              </span>
            )}
            <span className={cn(isPending && 'invisible')}>Mark as unpaid</span>
          </Button>
        )}
      </div>
      <div className="space-y-14">
        <div className="space-y-6 sm:flex sm:space-y-0 sm:gap-x-4">
          <div className="sm:flex-1">
            <p className="text-primary-500 font-semibold underline-offset-2 group-hover:underline">
              #{invoice.id}
            </p>
            <p className="font-semibold text-gray-900">{invoice.description}</p>
          </div>
          <ul className="text-gray-900 sm:flex-none sm:text-end">
            <li>{invoice.senderAddress.street}</li>
            <li>{invoice.senderAddress.city}</li>
            <li>{invoice.senderAddress.postCode}</li>
            <li>{invoice.senderAddress.country}</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-bunker-400 font-medium">Invoice Date</p>
              <p className="font-semibold text-gray-900">{formatDate(invoice.dateIssued)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-bunker-400 font-medium">Payment Due</p>
              <p className="font-semibold text-gray-900">{formatDate(invoice.paymentDue)}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-bunker-400 font-medium">Bill To</p>
            <div className="space-y-1">
              <p className="font-semibold text-gray-900">{invoice.clientName}</p>
              <ul className="text-gray-900">
                <li>{invoice.clientAddress.street}</li>
                <li>{invoice.clientAddress.city}</li>
                <li>{invoice.clientAddress.postCode}</li>
                <li>{invoice.clientAddress.country}</li>
              </ul>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-bunker-400 font-medium">Sent To</p>
            <p className="font-semibold text-gray-900">{invoice.clientEmail}</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg">
          <div className="bg-bunker-100 px-6 py-4">
            <div className="space-y-4 sm:hidden">
              {invoice.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-bunker-400 font-medium">
                      {item.quantity} x &pound; {formatAmount(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">&pound; {formatAmount(item.total)}</p>
                </div>
              ))}
            </div>
            <div className="hidden sm:grid sm:grid-cols-5 sm:gap-x-4 sm:gap-y-6">
              <div className="text-bunker-500 col-span-2">Item Name</div>
              <div className="text-bunker-500 col-span-1 text-center">QTY.</div>
              <div className="text-bunker-500 col-span-1 text-end">Price</div>
              <div className="text-bunker-500 col-span-1 text-end">Total</div>
              {invoice.items.map((item, idx) => (
                <Fragment key={idx}>
                  <div className="col-span-2 font-semibold text-gray-900">{item.name}</div>
                  <div className="text-bunker-500 col-span-1 text-center font-medium">
                    {item.quantity}
                  </div>
                  <div className="text-bunker-500 col-span-1 text-end font-medium">
                    &pound; {formatAmount(item.price)}
                  </div>
                  <div className="col-span-1 text-end font-semibold text-gray-900">
                    &pound; {formatAmount(item.total)}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="bg-bunker-900 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-bunker-50 font-medium">Amount Due</p>
              <p className="text-bunker-50 font-semibold">&pound; {formatAmount(invoice.total)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="border-l-4 border-red-400 bg-red-50 p-4">
          <div className="flex">
            <div className="shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-red-700">
                <span className="font-medium">Warning!</span> This action is irreversible.
              </p>
            </div>
          </div>
        </div>
        <InvoiceDeleteDialog />
      </div>
    </div>
  );
}

function PendingComponent() {
  return (
    <div className="divide-y divide-gray-200 *:py-8 *:first:pt-0 *:last:pb-0">
      <Skeleton className="h-8 w-full" />
      <div className="space-y-14">
        <Skeleton className="h-24" />
        <Skeleton className="h-36" />
        <Skeleton className="h-40" />
      </div>
      <Skeleton className="h-32" />
    </div>
  );
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
