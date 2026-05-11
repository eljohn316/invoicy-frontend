import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/button';
import { Field, FieldLabel, FieldError } from '@/components/fields';
import { Input } from '@/components/input';

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

type UpdatePasswordPayload = z.infer<typeof UpdatePasswordFormSchema>;

export function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newConfirmPassword: '',
    },
  });

  function onSubmit(payload: UpdatePasswordPayload) {
    console.log(payload);
  }

  function handleReset() {
    form.reset({ password: '', newPassword: '', newConfirmPassword: '' });
  }

  return (
    <div className="space-y-8">
      <p className="text-bunker-900 font-semibold">Password</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error}>
              <FieldLabel>Current password</FieldLabel>
              <Input {...field} type="password" />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error}>
              <FieldLabel>New password</FieldLabel>
              <Input {...field} type="password" />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="newConfirmPassword"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error}>
              <FieldLabel>Confirm new password</FieldLabel>
              <Input {...field} type="password" />
              <FieldError />
            </Field>
          )}
        />
        <div className="flex justify-end gap-x-4">
          <Button type="reset" variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
