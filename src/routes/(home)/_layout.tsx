import { z } from 'zod';
import { createFileRoute, Outlet, redirect, stripSearchParams } from '@tanstack/react-router';
import { InvoiceListHeader } from '@/features/invoices/components/invoice-list-header';
import { isLoggedIn } from '@/features/auth/hooks/use-auth';

const InvoiceSearchParamSchema = z.object({
  status: z.array(z.string()).default([]),
});

export const Route = createFileRoute('/(home)/_layout')({
  head: () => ({ meta: [{ title: 'Home | Invoice App' }] }),
  beforeLoad: () => {
    if (!isLoggedIn()) {
      throw redirect({ to: '/login', replace: true });
    }
  },
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
