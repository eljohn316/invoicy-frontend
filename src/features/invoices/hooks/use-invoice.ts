import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getInvoice } from '@/features/invoices/api/';
import { useParams } from '@tanstack/react-router';

export const invoiceQueryOptions = (invoiceId: string) =>
  queryOptions({
    queryKey: ['invoice', invoiceId],
    queryFn: () => getInvoice(invoiceId),
  });

export function useInvoice() {
  const invoiceId = useParams({
    from: '/invoices/(invoice)/_layout/$invoiceId',
    select: (params) => params.invoiceId,
  });
  return useSuspenseQuery(invoiceQueryOptions(invoiceId));
}
