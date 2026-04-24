import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { createInvoice } from '../api';

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createInvoice,
    onSuccess: (newInvoice) => {
      queryClient.setQueryData(['invoice', newInvoice.id], newInvoice);
      navigate({ to: '/invoices/$invoiceId', params: { invoiceId: newInvoice.id }, replace: true });
      toast.success('Invoice successfully created');
    },
    onError: (e: Error) => {
      console.log(e);
      toast.error('Failed to create invoice');
    },
  });
}
