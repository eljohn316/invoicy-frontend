import Logo from '@/assets/logo.svg?react';

export function Navigation() {
  return (
    <nav className="bg-bunker-900 flex h-18 items-center justify-between">
      <Logo className="h-full w-auto shrink-0" />
      <div className="mr-6 size-8 rounded-full bg-gray-200" />
    </nav>
  );
}
