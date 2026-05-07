import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { isLoggedIn } from '@/features/auth/hooks/use-auth';

export const Route = createFileRoute('/invoices/(update)/_layout')({
  beforeLoad: () => {
    if (!isLoggedIn()) {
      throw redirect({ to: '/login', replace: true });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-xl space-y-8 lg:space-y-12">
      <Link
        to=".."
        className="text-primary-500 inline-flex items-center gap-x-2 leading-none font-semibold hover:underline">
        <ChevronLeftIcon className="size-4" />
        Back
      </Link>
      <Outlet />
    </div>
  );
}
