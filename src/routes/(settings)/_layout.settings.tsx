import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { UpdateProfileDetailsForm } from '@/features/settings/components/update-profile-details-form';
import { UpdatePasswordForm } from '@/features/settings/components/update-password-form';
import { DeleteAccount } from '@/features/settings/components/delete-account';
import { UpdateProfilePhoto } from '@/features/settings/components/update-profile-photo';
import { SettingsSkeleton } from '@/features/settings/components/settings-skeleton';

export const Route = createFileRoute('/(settings)/_layout/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();

  if (typeof user === 'undefined') return <SettingsSkeleton />;

  if (user === null) return <Navigate to="/login" replace />;

  return (
    <div className="divide-y divide-gray-200 *:py-10 *:first:pt-0 *:last:pb-0">
      <UpdateProfilePhoto user={user} />
      <UpdateProfileDetailsForm user={user} />
      <UpdatePasswordForm />
      <DeleteAccount />
    </div>
  );
}
