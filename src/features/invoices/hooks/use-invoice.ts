import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getInvoice } from '@/features/invoices/api/';

export const invoiceQueryOptions = (invoiceId: string) =>
  queryOptions({
    queryKey: ['invoice', invoiceId],
    queryFn: () => getInvoice(invoiceId),
  });

export function useInvoice(invoiceId: string) {
  return useSuspenseQuery(invoiceQueryOptions(invoiceId));
}
