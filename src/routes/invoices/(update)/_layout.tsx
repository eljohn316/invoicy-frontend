import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/invoices/(update)/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
