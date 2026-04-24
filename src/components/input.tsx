import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';
import { useFieldContext } from './fields';

function Input({ className, type, id, ...props }: React.ComponentProps<'input'>) {
  const { fieldId, fieldError } = useFieldContext();

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      id={fieldId ? fieldId : id}
      className={cn(
        'border-primary-200 block w-full rounded-sm border bg-white px-4 py-3.5 text-[15px] leading-none font-semibold shadow-xs',
        'focus:ring-primary-500 focus:ring-1 focus:outline-none',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50',
        'aria-invalid:border-red-600 aria-invalid:focus:ring-red-600',
        className,
      )}
      aria-invalid={fieldError ? 'true' : 'false'}
      {...props}
    />
  );
}

export { Input };
