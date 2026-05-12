import * as z from 'zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
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
import { Alert } from '@/components/alert';
import { Spinner } from '@/components/spinner';
import { deleteCurrentUser } from '@/features/settings/api';
import { useAuth } from '@/features/auth/hooks/use-auth';

const DeleteAccountFormSchema = z.object({
  password: z.string().min(1, "Can't be empty").min(8, 'Password too short'),
});

export type DeleteAccountPayload = z.infer<typeof DeleteAccountFormSchema>;

export function DeleteAccount() {
  const [open, setOpen] = useState(false);

  const form = useForm<DeleteAccountPayload>({
    resolver: zodResolver(DeleteAccountFormSchema),
    defaultValues: {
      password: '',
    },
  });
  const { logout } = useAuth();
  const {
    isPending,
    mutate: deleteUser,
    error,
    reset,
  } = useMutation({
    mutationFn: deleteCurrentUser,
    onSuccess: ({ message }) => {
      logout(message);
    },
  });

  function onSubmit(payload: DeleteAccountPayload) {
    deleteUser(payload);
  }

  function handleToggleModal(open: boolean) {
    setOpen(open);

    if (open === false) {
      reset();
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
            {error && <Alert className="mt-4">{error.message}</Alert>}
            <DialogDescription className="mt-4 text-[15px]">
              Enter password to confirm account deletion
            </DialogDescription>
            <div className="mt-1 space-y-4">
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field fieldId={field.name} fieldError={fieldState.error} className="space-y-1">
                    <FieldLabel className="sr-only">Current password</FieldLabel>
                    <Input {...field} type="password" disabled={isPending} />
                    <FieldError />
                  </Field>
                )}
              />
              <Button type="submit" variant="danger" className="w-full">
                {isPending && <Spinner />}
                {isPending ? 'Deleting account...' : 'Delete account'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
