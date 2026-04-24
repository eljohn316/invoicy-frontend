import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CheckCircleIcon className="size-5 text-green-600" />,
        error: <XCircleIcon className="size-5 text-red-600" />,
      }}
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
          title: 'text-sm',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
