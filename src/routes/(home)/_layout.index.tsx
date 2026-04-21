import { InvoiceListItem } from '@/features/invoices/components/invoice-list-item';
import type { InvoiceListItem as Invoice } from '@/features/invoices/types/invoice';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/(home)/_layout/')({
  component: RouteComponent,
});

const invoices: Invoice[] = [
  {
    clientName: 'Jensen Huang',
    id: '4e7l7xsxd2s5u4l0inm5h',
    paymentDue: new Date('2021-9-20'),
    status: 'pending',
    total: 1800.9,
  },
  {
    clientName: 'Marcus Okoro',
    id: '4e7l7xsxd2s5u4l0inm5h',
    paymentDue: new Date('2021-9-20'),
    status: 'paid',
    total: 1800.9,
  },
  {
    clientName: 'Elena Rodriguez',
    id: '4e7l7xsxd2s5u4l0inm5h',
    paymentDue: new Date('2021-9-20'),
    status: 'draft',
    total: 1800.9,
  },
];

function RouteComponent() {
  return (
    <div className="divide-y divide-gray-200 *:py-4 *:first:pt-0 *:last:pb-0">
      {invoices.map((invoice) => (
        <Link to="/invoices/$invoiceId" params={{ invoiceId: invoice.id }} className="block">
          <InvoiceListItem key={invoice.id} invoice={invoice} />
        </Link>
      ))}
    </div>
  );
}
