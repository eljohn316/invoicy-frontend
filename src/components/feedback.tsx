import { cn } from '@/lib/utils';
import * as React from 'react';

function Feedback({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('space-y-1 text-center', className)} {...props}>
      {children}
    </div>
  );
}

function FeedbackTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3 className={cn('text-2xl font-bold text-gray-900 md:text-3xl', className)} {...props} />
  );
}

function FeedbackDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-gray-700 md:text-lg', className)} {...props} />;
}

export { Feedback, FeedbackTitle, FeedbackDescription };
