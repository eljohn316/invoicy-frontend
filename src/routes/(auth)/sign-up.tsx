import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { isLoggedIn } from '@/features/auth/hooks/use-auth';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/sign-up')({
  head: () => ({ meta: [{ title: 'Sign Up | Invoice App' }] }),
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
      <SignUpForm />
    </div>
  );
}
