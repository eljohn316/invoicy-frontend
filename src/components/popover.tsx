import { Popover as PopoverPrimitive } from '@base-ui/react/popover';

import { cn } from '@/lib/utils';
import { useFieldContext } from './fields';

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ className, ...props }: PopoverPrimitive.Trigger.Props) {
  const { fieldId } = useFieldContext();

  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={cn(
        'border-primary-200 focus:ring-primary-500 block w-full rounded-sm border bg-white px-4 py-3.5 text-start text-[15px] leading-none font-semibold shadow-xs focus:ring-1 focus:outline-none',
        className,
      )}
      id={fieldId}
      {...props}
    />
  );
}

function PopoverContent({
  className,
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 12,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}>
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            'data-[side=bottom]:slide-in-from-top-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 flex h-(--popup-height) origin-(--transform-origin) flex-col rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-md outline-hidden duration-100',
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverContent, PopoverTrigger };
