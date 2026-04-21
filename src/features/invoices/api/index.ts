import qs from 'query-string';
import { isAxiosError } from 'axios';
import { notFound } from '@tanstack/react-router';
import { api } from '@/api';
import type {
  Invoice,
  InvoiceListItem,
  InvoiceSearchParam,
} from '@/features/invoices/types/invoice';

export const getAllInvoices = async ({ status }: InvoiceSearchParam) => {
  const { data } = await api.get<InvoiceListItem[]>('/invoices', {
    params: {
      status,
    },
    paramsSerializer: (params) => qs.stringify(params),
  });

  return data;
};

export const getInvoice = async (invoiceId: string) => {
  try {
    const { data } = await api.get<Invoice>(`/invoices/${invoiceId}`);
    return data;
  } catch (e) {
    if (isAxiosError(e) && e.status === 404) throw notFound();
    throw e;
  }
};
