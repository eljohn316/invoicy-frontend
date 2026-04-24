import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/button';
import { Spinner } from '@/components/spinner';
import { InvoiceFormFields } from '@/features/invoices/components/invoice-form-fields';
import { InvoiceFormSchema } from '@/features/invoices/schemas';

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

  function handleCancel() {
    navigate({ to: '/' });
  }

  async function onSubmit(payload: InvoiceFormPayload) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(payload);
    toast.success('Invoice successfully created');
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
      <h3 className="text-3xl font-bold tracking-tighter text-gray-900">New Invoice</h3>
      <InvoiceFormFields form={form} isSubmitting={false} />
      <div className="xs:flex grid grid-cols-2 gap-4">
        <Button
          variant="ghost"
          className="col-span-1"
          disabled={form.formState.isSubmitting}
          onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="xs:ml-auto col-span-1"
          disabled={form.formState.isSubmitting}>
          Save as Draft
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="col-span-2 row-start-1"
          disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Spinner />}
          {form.formState.isSubmitting ? 'Creating invoice...' : 'Create invoice'}
        </Button>
      </div>
    </form>
  );
}
