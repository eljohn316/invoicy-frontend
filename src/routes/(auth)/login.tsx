import * as z from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { LoginForm } from '@/features/auth/components/login-form';
import { createFileRoute, redirect, stripSearchParams } from '@tanstack/react-router';
import { isLoggedIn } from '@/features/auth/hooks/use-auth';

const LoginSearchParamSchema = z.object({
  sessionExpired: z.boolean().default(false),
});

export const Route = createFileRoute('/(auth)/login')({
  head: () => ({ meta: [{ title: 'Login | Invoice App' }] }),
  beforeLoad: () => {
    if (isLoggedIn()) {
      throw redirect({ to: '/', replace: true });
    }
  },
  component: RouteComponent,
  validateSearch: LoginSearchParamSchema,
  search: {
    middlewares: [stripSearchParams({ sessionExpired: false })],
  },
});

function RouteComponent() {
  const search = Route.useSearch();

  useEffect(() => {
    if (search.sessionExpired) {
      toast.error('Session expired! You need to login again');
    }
  }, []);

  return (
    <div className="mx-auto max-w-sm">
      <LoginForm />
    </div>
  );
}
