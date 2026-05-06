import * as React from 'react';
import { cn } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/20/solid';

export function Alert({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex rounded-md bg-red-50 p-4', className)} {...props}>
      <div className="shrink-0">
        <XCircleIcon className="size-5 text-red-400" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <div className="text-[15px] font-medium text-red-800">{children}</div>
      </div>
    </div>
  );
}
