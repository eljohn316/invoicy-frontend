import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/invoices/(invoice)/_layout/$invoiceId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/invoices/(invoice)/_layout/$invoiceId"!</div>;
}
