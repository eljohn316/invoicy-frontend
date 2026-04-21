import { Button } from '@/components/button';
import { Filter } from '@/components/filter';

export function InvoiceListHeader() {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-bold tracking-tighter text-gray-900 md:text-3xl lg:text-4xl">
        Invoices
      </h3>
      <div className="flex items-center gap-x-8">
        <Filter />
        <Button variant="primary">+ New Invoice</Button>
      </div>
    </div>
  );
}
