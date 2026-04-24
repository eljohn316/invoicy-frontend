import { Link } from '@tanstack/react-router';
import { Filter } from '@/components/filter';

export function InvoiceListHeader() {
  return (
    <div className="space-y-6 sm:space-y-0">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold tracking-tighter text-gray-900 lg:text-4xl">Invoices</h3>
        <div className="flex items-center gap-x-8">
          <div className="hidden sm:block">
            <Filter />
          </div>
          <Link to="/new-invoice" className="link link-primary">
            + New Invoice
          </Link>
        </div>
      </div>
      <div className="flex justify-end sm:hidden">
        <Filter />
      </div>
    </div>
  );
}
