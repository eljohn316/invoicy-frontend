import Logo from '@/assets/logo.svg?react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Link } from '@tanstack/react-router';
import { Avatar } from './avatar';

export function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-bunker-900 flex h-18 items-center justify-between pr-4 sm:pr-6">
      <Logo className="h-full w-auto shrink-0" />
      {user ? (
        <div className="flex items-center gap-x-4 sm:gap-x-6">
          <Avatar profileImage={user.profileImage} seed={user.fullName} />
          <button
            className="text-bunker-100 text-[15px] font-medium hover:underline hover:underline-offset-1"
            onClick={logout}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-x-4 sm:gap-x-8">
          <Link
            to="/login"
            className="text-bunker-100 font-medium hover:underline hover:underline-offset-1">
            Login
          </Link>
          <Link
            to="/login"
            className="text-bunker-100 font-medium hover:underline hover:underline-offset-1">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
