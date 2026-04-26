import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog';
import { Spinner } from '@/components/spinner';
import { useDeleteInvoice } from '@/features/invoices/hooks/use-delete-invoice';

export function InvoiceDeleteDialog() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const invoiceId = useParams({
    from: '/invoices/(invoice)/_layout/$invoiceId',
    select: (params) => params.invoiceId,
  });

  const { isPending, mutate: deleteInvoice } = useDeleteInvoice();

  async function handleDelete() {
    deleteInvoice(invoiceId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['invoices', []] });
        await navigate({ to: '/', replace: true });
        toast.success('Invoice successfully deleted');
      },
      onError: () => {
        setOpen(false);
        toast.error('Failed to delete invoice');
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="danger">Delete Invoice</Button>} />
      <DialogContent>
        <div className="space-y-3">
          <DialogTitle>Confirm delete</DialogTitle>
          <DialogDescription>Are you sure you want to delete this invoice?</DialogDescription>
        </div>
        <DialogFooter className="mt-6 flex justify-end gap-x-4">
          <DialogClose
            render={
              <Button variant="ghost" disabled={isPending}>
                Cancel
              </Button>
            }
          />
          <Button variant="danger" onClick={handleDelete} disabled={isPending}>
            {isPending && <Spinner />}
            {isPending ? 'Deleting' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
