import { Skeleton } from '@/components/skeleton';

export function InvoiceFormSkeleton() {
  return (
    <div className="space-y-10">
      <Skeleton className="h-9 max-w-3/4" />
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="text-primary-500 font-bold">Bill From</div>
          <Skeleton className="h-60" />
        </div>
        <div className="space-y-6">
          <div className="text-primary-500 font-bold">Bill To</div>
          <Skeleton className="h-150" />
        </div>
        <div className="space-y-6">
          <div className="text-primary-500 text-lg font-bold">Items</div>
          <Skeleton className="h-36" />
        </div>
      </div>
      <Skeleton className="h-10.5" />
    </div>
  );
}
