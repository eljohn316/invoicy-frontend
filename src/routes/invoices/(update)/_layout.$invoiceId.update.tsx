import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/invoices/(update)/_layout/$invoiceId/update')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/invoices/(update)/_layout/$invoiceId/update"!</div>;
}
