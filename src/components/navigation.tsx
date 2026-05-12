import Logo from '@/assets/logo.svg?react';
import { Link } from '@tanstack/react-router';
import { Avatar } from '@/components/avatar';
import { Skeleton } from '@/components/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown';
import { useAuth } from '@/features/auth/hooks/use-auth';

export function Navigation() {
  const { user, isFetchingUser, logout } = useAuth();

  return (
    <nav className="bg-bunker-900 flex h-18 items-center justify-between pr-4 sm:pr-6">
      <Logo className="h-full w-auto shrink-0" />
      {isFetchingUser ? (
        <Skeleton className="bg-bunker-700 h-8 w-full max-w-32" />
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="size-10 rounded-full px-0 ring-1 ring-transparent outline-none hover:ring-gray-100 focus:ring-gray-100">
            <Avatar
              profileImage={user.profileImage}
              seed={user.fullName}
              className="size-full px-0"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40 p-2">
            <div className="divide-y divide-gray-200 *:py-2 *:first:pt-0 *:last:pb-0">
              <DropdownMenuGroup>
                <div className="space-y-0.5 px-2.5 py-1">
                  <p className="text-sm text-gray-400">Logged in as</p>
                  <p className="text-bunker-800 text-[15px]">{user.fullName}</p>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuGroup className="space-y-0.75">
                <DropdownMenuItem className="block" render={<Link to="/settings">Settings</Link>} />
                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
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
