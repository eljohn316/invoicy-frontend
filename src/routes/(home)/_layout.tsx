import { z } from 'zod';
import { createFileRoute, Outlet, stripSearchParams } from '@tanstack/react-router';
import { InvoiceListHeader } from '@/features/invoices/components/invoice-list-header';

const InvoiceSearchParamSchema = z.object({
  status: z.array(z.string()).default([]),
});

export const Route = createFileRoute('/(home)/_layout')({
  head: () => ({ meta: [{ title: 'Home | Invoice App' }] }),
  validateSearch: InvoiceSearchParamSchema,
  search: {
    middlewares: [stripSearchParams({ status: [] })],
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-3xl">
      <InvoiceListHeader />
      <div className="mt-4 sm:mt-8 md:mt-12">
        <Outlet />
      </div>
    </div>
  );
}
