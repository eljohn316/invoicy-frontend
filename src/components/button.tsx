import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-3xl px-4 py-2 text-[15px] font-semibold duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[svg]:gap-2 sm:px-6 sm:py-2.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-primary-50 hover:bg-primary-600 focus:ring-primary-500',
        ghost: 'bg-primary-50 hover:bg-primary-100 text-primary-950 focus:ring-primary-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        secondary: 'bg-bunker-950 hover:bg-bunker-950/85 focus:ring-bunker-950 text-white',
      },
    },
  },
);

function Button({
  variant,
  className,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
