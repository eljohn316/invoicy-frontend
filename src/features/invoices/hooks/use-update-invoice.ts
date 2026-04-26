import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { updateInvoice } from '@/features/invoices/api';
import type { InvoiceUpdatePayload } from '@/features/invoices/types/invoice';

export function useUpdateInvoice(invoiceId: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: InvoiceUpdatePayload) => updateInvoice(invoiceId, payload),
    onSuccess: async (updatedInvoice) => {
      queryClient.setQueryData(['invoice', updatedInvoice.id], updatedInvoice);
      await navigate({
        to: '/invoices/$invoiceId',
        params: { invoiceId: updatedInvoice.id },
        replace: true,
      });
      toast.success('Invoice successfully updated');
    },
    onError: (e: Error) => {
      console.log(e);
      toast.error('Failed to update invoice');
    },
  });
}
