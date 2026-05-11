import * as z from 'zod';
import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '@/features/auth/types';
import { updateCurrentUser } from '@/features/auth/api';
import { Button } from '@/components/button';
import { Field, FieldLabel, FieldError } from '@/components/fields';
import { Input } from '@/components/input';
import { Spinner } from '@/components/spinner';

const UpdateDetailsFormSchema = z.object({
  firstName: z.string().min(1, "Can't be empty"),
  lastName: z.string().min(1, "Can't be empty"),
  email: z.email(),
});

export type UpdateDetailsPayload = z.infer<typeof UpdateDetailsFormSchema>;

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
  const queryClient = useQueryClient();
  const { isPending, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['current-user'], data);
      toast.success('Profile successfully updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(payload: UpdateDetailsPayload) {
    updateUser(payload);
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
            <Field fieldId={field.name} fieldError={fieldState.error} className="space-y-1">
              <FieldLabel>First name</FieldLabel>
              <Input {...field} disabled={isPending} />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error} className="space-y-1">
              <FieldLabel>Last Name</FieldLabel>
              <Input {...field} disabled={isPending} />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field fieldId={field.name} fieldError={fieldState.error} className="space-y-1">
              <FieldLabel>Email</FieldLabel>
              <Input {...field} type="email" disabled={isPending} />
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
