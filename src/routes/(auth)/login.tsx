import { LoginForm } from '@/features/auth/components/login-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/login')({
  head: () => ({ meta: [{ title: 'Login | Invoice App' }] }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-sm">
      <LoginForm />
    </div>
  );
}
