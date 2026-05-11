import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { updateCurrentUserPassword } from '@/features/settings/api';
import { Button } from '@/components/button';
import { Field, FieldLabel, FieldError } from '@/components/fields';
import { Input } from '@/components/input';
import { Alert } from '@/components/alert';
import { Spinner } from '@/components/spinner';

const UpdatePasswordFormSchema = z
  .object({
    password: z.string().min(1, "Can't be empty").min(8, 'Password too short'),
    newPassword: z.string().min(1, "Can't be empty").min(8, 'Password too short'),
    newConfirmPassword: z.string().min(1, "Can't be empty").min(8, 'Password too short'),
  })
  .refine((data) => data.newPassword === data.newConfirmPassword, {
    error: "Passwords don't match",
    path: ['newConfirmPassword'],
  });

export type UpdatePasswordPayload = z.infer<typeof UpdatePasswordFormSchema>;

export function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newConfirmPassword: '',
    },
  });

  const {
    isPending,
    mutate: updatePassword,
    error,
    reset,
  } = useMutation({
    mutationFn: updateCurrentUserPassword,
    onSuccess: ({ message }) => {
      form.reset({
        password: '',
        newPassword: '',
        newConfirmPassword: '',
      });
      toast.success(message);
    },
  });

  function onSubmit(payload: UpdatePasswordPayload) {
    updatePassword(payload);
  }

  function handleReset() {
    reset();
    form.reset({ password: '', newPassword: '', newConfirmPassword: '' });
  }

  return (
    <div className="space-y-8">
      <p className="text-bunker-900 font-semibold">Password</p>
      {error && <Alert>{error.message}</Alert>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error} className="space-y-1">
              <FieldLabel>Current password</FieldLabel>
              <Input {...field} type="password" disabled={isPending} />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error} className="space-y-1">
              <FieldLabel>New password</FieldLabel>
              <Input {...field} type="password" disabled={isPending} />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="newConfirmPassword"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error} className="space-y-1">
              <FieldLabel>Confirm new password</FieldLabel>
              <Input {...field} type="password" disabled={isPending} />
              <FieldError />
            </Field>
          )}
        />
        <div className="flex justify-end gap-x-4">
          <Button type="reset" variant="ghost" disabled={isPending} onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending && <Spinner />}
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </div>
  );
}
