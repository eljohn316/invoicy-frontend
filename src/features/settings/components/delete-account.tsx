import * as z from 'zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog';
import { Button } from '@/components/button';
import { Field, FieldError, FieldLabel } from '@/components/fields';
import { Input } from '@/components/input';

const DeleteAccountFormSchema = z.object({
  password: z.string().min(1, "Can't be empty").min(8, 'Password too short'),
});

type DeleteAccountPayload = z.infer<typeof DeleteAccountFormSchema>;

export function DeleteAccount() {
  const [open, setOpen] = useState(false);

  const form = useForm<DeleteAccountPayload>({
    resolver: zodResolver(DeleteAccountFormSchema),
    defaultValues: {
      password: '',
    },
  });

  function onSubmit(payload: DeleteAccountPayload) {
    console.log(payload);
  }

  function handleToggleModal(open: boolean) {
    setOpen(open);

    if (open === false) {
      form.reset({ password: '' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-red-400 bg-red-50 p-4">
        <p className="font-semibold text-red-700">Danger Zone</p>
        <p className="text-[15px] text-red-700">Permanently delete your account and data.</p>
      </div>
      <Dialog open={open} onOpenChange={handleToggleModal}>
        <DialogTrigger render={<Button variant="danger">Delete account</Button>} />
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription className="mt-4 text-[15px]">
              Enter password to confirm account deletion
            </DialogDescription>
            <div className="mt-1 space-y-4">
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field fieldId={field.name} fieldError={fieldState.error}>
                    <FieldLabel className="sr-only">Current password</FieldLabel>
                    <Input {...field} type="password" />
                    <FieldError />
                  </Field>
                )}
              />
              <Button type="submit" variant="danger" className="w-full">
                Delete account
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
