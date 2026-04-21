import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';

export const Route = createFileRoute('/invoices/(invoice)/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 lg:space-y-12">
      <Link
        to="/"
        className="text-primary-500 inline-flex items-center gap-x-2 leading-none font-semibold hover:underline">
        <ChevronLeftIcon className="size-4" />
        Back to Home
      </Link>
      <Outlet />
    </div>
  );
}
