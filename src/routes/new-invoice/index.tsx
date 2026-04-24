import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { CreateInvoiceForm } from '@/features/invoices/components/invoice-form';

export const Route = createFileRoute('/new-invoice/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-xl space-y-8 lg:space-y-12">
      <Link
        to="/"
        className="text-primary-500 inline-flex items-center gap-x-2 leading-none font-semibold hover:underline">
        <ChevronLeftIcon className="size-4" />
        Back to Home
      </Link>
      <CreateInvoiceForm />
    </div>
  );
}
