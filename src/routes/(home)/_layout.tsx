import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(home)/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
