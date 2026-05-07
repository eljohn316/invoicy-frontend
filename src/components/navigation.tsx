import Logo from '@/assets/logo.svg?react';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Avatar } from '@/components/avatar';
import { Skeleton } from '@/components/skeleton';

export function Navigation() {
  const { user, isFetchingUser, logout } = useAuth();

  return (
    <nav className="bg-bunker-900 flex h-18 items-center justify-between pr-4 sm:pr-6">
      <Logo className="h-full w-auto shrink-0" />
      {isFetchingUser ? (
        <Skeleton className="bg-bunker-700 h-8 w-full max-w-32" />
      ) : user ? (
        <div className="flex items-center gap-x-4 sm:gap-x-6">
          <Avatar profileImage={user.profileImage} seed={user.fullName} />
          <button
            className="text-bunker-100 text-[15px] font-medium hover:underline hover:underline-offset-2"
            onClick={logout}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-x-4 sm:gap-x-8">
          <Link
            to="/login"
            className="text-bunker-100 text-[15px] font-medium hover:underline hover:underline-offset-2">
            Login
          </Link>
          <Link
            to="/sign-up"
            className="text-bunker-100 text-[15px] font-medium hover:underline hover:underline-offset-2">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
