import * as React from 'react';
import { Outlet, createRootRouteWithContext, HeadContent, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/button';

type RootRouteContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({ meta: [{ title: 'Invoice App' }] }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <HeadContent />
      <Navigation />
      <div className="px-4 py-8 sm:py-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </React.Fragment>
  );
}

function NotFoundComponent() {
  return (
    <div className="py-10 text-center">
      <h4 className="text-6xl font-bold text-gray-900 lg:text-8xl">404</h4>
      <div className="mt-6 mb-10 space-y-1">
        <p className="text-primary-500 text-2xl font-bold">Oops! Page not found</p>
        <p className="text-gray-700">The page you're looking for was not found</p>
      </div>
      <Button variant="primary" render={<Link to="/">Take me Home</Link>} nativeButton={false} />
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className="py-10 text-center">
      <div className="mb-10 space-y-1">
        <p className="text-5xl font-bold text-gray-900">Error</p>
        <p className="text-primary-500 text-lg">Something went wrong. Please try again</p>
      </div>
      <Button variant="primary" render={<Link to="/">Go Home</Link>} nativeButton={false} />
    </div>
  );
}
