import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@/features/auth/types';
import { Button } from '@/components/button';
import { Field, FieldLabel, FieldError } from '@/components/fields';
import { Input } from '@/components/input';

const UpdateDetailsFormSchema = z.object({
  firstName: z.string().min(1, "Can't be empty"),
  lastName: z.string().min(1, "Can't be empty"),
  email: z.email(),
});

type UpdateDetailsPayload = z.infer<typeof UpdateDetailsFormSchema>;

type UpdateProfileDetailsFormProps = {
  user: User;
};

export function UpdateProfileDetailsForm({ user }: UpdateProfileDetailsFormProps) {
  const form = useForm<UpdateDetailsPayload>({
    resolver: zodResolver(UpdateDetailsFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  function onSubmit(payload: UpdateDetailsPayload) {
    console.log(payload);
  }

  function handleReset() {
    form.reset({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  }

  return (
    <div className="space-y-8">
      <p className="text-bunker-900 font-semibold">Personal details</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error}>
              <FieldLabel>Email</FieldLabel>
              <Input {...field} />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error}>
              <FieldLabel>Last Name</FieldLabel>
              <Input {...field} />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error}>
              <FieldLabel>Email</FieldLabel>
              <Input {...field} type="email" />
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
