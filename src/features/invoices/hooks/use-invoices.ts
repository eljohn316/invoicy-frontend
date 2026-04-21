import { useSearch } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getAllInvoices } from '@/features/invoices/api';
import type { InvoiceSearchParam } from '@/features/invoices/types/invoice';

export const invoicesQueryOptions = ({ status }: InvoiceSearchParam) =>
  queryOptions({
    queryKey: ['invoices', status],
    queryFn: () => getAllInvoices({ status }),
  });

export function useInvoices() {
  const status = useSearch({ from: '/(home)/_layout', select: (state) => state.status });
  return useSuspenseQuery(invoicesQueryOptions({ status }));
}
