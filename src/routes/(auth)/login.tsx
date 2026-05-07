import { LoginForm } from '@/features/auth/components/login-form';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { isLoggedIn } from '@/features/auth/hooks/use-auth';

export const Route = createFileRoute('/(auth)/login')({
  head: () => ({ meta: [{ title: 'Login | Invoice App' }] }),
  beforeLoad: () => {
    if (isLoggedIn()) {
      throw redirect({ to: '/', replace: true });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-sm">
      <LoginForm />
    </div>
  );
}
