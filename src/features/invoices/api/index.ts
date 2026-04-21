import qs from 'query-string';
import { api } from '@/api';
import type { InvoiceListItem, InvoiceSearchParam } from '@/features/invoices/types/invoice';

export const getAllInvoices = async ({ status }: InvoiceSearchParam) => {
  const { data } = await api.get<InvoiceListItem[]>('/invoices', {
    params: {
      status,
    },
    paramsSerializer: (params) => qs.stringify(params),
  });

  return data;
};
