import * as z from 'zod';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/button';
import { Spinner } from '@/components/spinner';
import { InvoiceFormFields } from '@/features/invoices/components/invoice-form-fields';
import { InvoiceFormSchema } from '@/features/invoices/schemas';
import { useCreateInvoice } from '@/features/invoices/hooks/use-create-invoice';
import { formatDate } from 'date-fns';

export type InvoiceFormPayload = z.infer<typeof InvoiceFormSchema>;

export function CreateInvoiceForm() {
  const navigate = useNavigate();
  const form = useForm<InvoiceFormPayload>({
    resolver: zodResolver(InvoiceFormSchema),
    defaultValues: {
      senderAddress: {
        street: '',
        city: '',
        postCode: '',
        country: '',
      },
      clientName: '',
      clientEmail: '',
      clientAddress: {
        street: '',
        city: '',
        postCode: '',
        country: '',
      },
      dateIssued: new Date(),
      description: '',
      paymentTerms: 30,
      items: [
        {
          name: '',
          price: 0,
          quantity: 0,
        },
      ],
    },
  });

  const { isPending, mutate: createInvoice } = useCreateInvoice();

  function handleCancel() {
    navigate({ to: '/' });
  }

  function onSubmit(payload: InvoiceFormPayload) {
    createInvoice({
      ...payload,
      dateIssued: formatDate(payload.dateIssued, 'yyyy-MM-dd'),
      status: 'pending',
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
      <h3 className="text-3xl font-bold tracking-tighter text-gray-900">New Invoice</h3>
      <InvoiceFormFields form={form} isSubmitting={isPending} />
      <div className="xs:flex grid grid-cols-2 gap-4">
        <Button variant="ghost" className="col-span-1" disabled={isPending} onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="secondary" className="xs:ml-auto col-span-1" disabled={isPending}>
          Save as Draft
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="col-span-2 row-start-1"
          disabled={isPending}>
          {isPending && <Spinner />}
          {isPending ? 'Creating invoice...' : 'Create invoice'}
        </Button>
      </div>
    </form>
  );
}
