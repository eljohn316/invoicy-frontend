import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/button';
import { Field, FieldError, FieldLabel } from '@/components/fields';
import { Input } from '@/components/input';
import { Spinner } from '@/components/spinner';
import { Alert } from '@/components/alert';
import { useLogin } from '@/features/auth/hooks/use-login';
import { LoginFormSchema } from '@/features/auth/schemas';

export type LoginFormPayload = z.infer<typeof LoginFormSchema>;

export function LoginForm() {
  const form = useForm<LoginFormPayload>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: localStorage.getItem('email') ?? '',
      password: localStorage.getItem('password') ?? '',
      rememberMe: localStorage.getItem('rememberMe')
        ? JSON.parse(localStorage.getItem('rememberMe') as string)
        : false,
    },
  });

  const { isPending, mutate: login, error } = useLogin();

  function handleRememberMe(rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('email', form.getValues('email'));
      localStorage.setItem('password', form.getValues('password'));
      localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }
  }

  function onSubmit(payload: LoginFormPayload) {
    login(payload, {
      onSuccess: () => {
        handleRememberMe(payload.rememberMe);
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <h2 className="text-center text-3xl font-bold tracking-tighter text-gray-900 lg:text-4xl">
          Login
        </h2>
        {error && <Alert>{error.message}</Alert>}
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field
              fieldId={field.name}
              fieldError={fieldState.error}
              className="col-span-2 space-y-1">
              <FieldLabel>Email</FieldLabel>
              <Input {...field} disabled={isPending} />
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
          name="rememberMe"
          render={({ field }) => (
            <div className="flex items-center">
              <input
                id={field.name}
                name={field.name}
                checked={field.value}
                onChange={field.onChange}
                type="checkbox"
                className="text-primary-500 focus:ring-primary-500 size-4 rounded border-gray-300"
              />
              <label
                htmlFor={field.name}
                className="text-bunker-400 ml-3 block text-[15px] leading-6 select-none">
                Remember me
              </label>
            </div>
          )}
        />
        <Button type="submit" variant="primary" className="w-full" disabled={isPending}>
          {isPending && <Spinner />}
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
        <p className="text-bunker-500 text-center text-[15px]">
          Don't have an account yet?{' '}
          <Link
            to="/login"
            className="text-primary-500 font-semibold hover:underline hover:underline-offset-2">
            Create account
          </Link>
        </p>
      </div>
    </form>
  );
}
