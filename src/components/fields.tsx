import { createContext, useContext } from 'react';
import type { FieldError as TFieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

type FieldContext = { fieldId?: string; fieldError?: TFieldError };

const FieldContext = createContext<FieldContext>({});

function useFieldContext() {
  return useContext(FieldContext);
}

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return <fieldset data-slot="field-set" className={cn('', className)} {...props} />;
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn('text-primary-500 font-bold', className)}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="field-group" className={cn('', className)} {...props} />;
}

function Field({
  fieldId,
  fieldError,
  className,
  ...props
}: React.ComponentProps<'div'> & FieldContext) {
  return (
    <FieldContext.Provider value={{ fieldId, fieldError }}>
      <div role="group" data-slot="field" className={cn(className)} {...props} />
    </FieldContext.Provider>
  );
}

function FieldLabel({ className, htmlFor, ...props }: React.ComponentProps<'label'>) {
  const { fieldId } = useFieldContext();

  return (
    <label
      data-slot="field-label"
      htmlFor={fieldId ? fieldId : htmlFor}
      className={cn('text-bunker-400 block text-[15px] leading-none font-medium', className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: React.ComponentProps<'div'>) {
  const { fieldError } = useFieldContext();

  if (!fieldError || !fieldError.message) return null;

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-sm text-red-600', className)}
      {...props}>
      {fieldError.message}
    </div>
  );
}

export { Field, FieldLabel, FieldError, FieldGroup, FieldLegend, FieldSet, useFieldContext };
