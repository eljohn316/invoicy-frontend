import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/button';
import { Field, FieldError, FieldLabel } from '@/components/fields';
import { Input } from '@/components/input';
import { Spinner } from '@/components/spinner';
import { Alert } from '@/components/alert';
import { SignUpFormSchema } from '@/features/auth/schemas';
import { useAuth } from '@/features/auth/hooks/use-auth';

export type SignUpPayload = z.infer<typeof SignUpFormSchema>;

export function SignUpForm() {
  const form = useForm<SignUpPayload>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    signUpMutation: { isPending, mutate: signUp, error },
  } = useAuth();

  function onSubmit(payload: SignUpPayload) {
    signUp({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <h2 className="text-center text-3xl font-bold tracking-tighter text-gray-900 lg:text-4xl">
          Sign Up
        </h2>
        {error && <Alert>{error.message}</Alert>}
        <Controller
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <Field
              fieldId={field.name}
              fieldError={fieldState.error}
              className="col-span-2 space-y-1">
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
            <Field
              fieldId={field.name}
              fieldError={fieldState.error}
              className="col-span-2 space-y-1">
              <FieldLabel>Last name</FieldLabel>
              <Input {...field} disabled={isPending} />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field
              fieldId={field.name}
              fieldError={fieldState.error}
              className="col-span-2 space-y-1">
              <FieldLabel>Email</FieldLabel>
              <Input {...field} type="email" disabled={isPending} />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field
              fieldId={field.name}
              fieldError={fieldState.error}
              className="col-span-2 space-y-1">
              <FieldLabel>Password</FieldLabel>
              <Input {...field} type="password" disabled={isPending} />
              <FieldError />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field
              fieldId={field.name}
              fieldError={fieldState.error}
              className="col-span-2 space-y-1">
              <FieldLabel>Confirm password</FieldLabel>
              <Input {...field} type="password" disabled={isPending} />
              <FieldError />
            </Field>
          )}
        />
        <Button type="submit" variant="primary" className="w-full" disabled={isPending}>
          {isPending && <Spinner />}
          {isPending ? 'Signing up...' : 'Sign up'}
        </Button>
        <p className="text-bunker-500 text-center text-[15px]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary-500 font-semibold hover:underline hover:underline-offset-2">
            Login
          </Link>{' '}
          instead.
        </p>
      </div>
    </form>
  );
}
