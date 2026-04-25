import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { updateInvoice } from '@/features/invoices/api';
import type { InvoiceUpdatePayload } from '@/features/invoices/types/invoice';

export function useUpdateInvoice() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const invoiceId = useParams({
    from: '/invoices/(update)/_layout/$invoiceId/update',
    select: (params) => params.invoiceId,
  });

  return useMutation({
    mutationFn: (payload: InvoiceUpdatePayload) => updateInvoice(invoiceId, payload),
    onSuccess: (updatedInvoice) => {
      queryClient.setQueryData(['invoice', updatedInvoice.id], updatedInvoice);
      navigate({
        to: '/invoices/$invoiceId',
        params: { invoiceId: updatedInvoice.id },
        replace: true,
      });
      toast.success('Invoice successfully update');
    },
    onError: (e: Error) => {
      console.log(e);
      toast.error('Failed to update invoice');
    },
  });
}
