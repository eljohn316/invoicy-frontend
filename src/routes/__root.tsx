import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navigation } from '@/components/navigation';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Navigation />
      <div className="px-4 py-8 sm:py-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
