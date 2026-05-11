import { Skeleton } from '@/components/skeleton';

export function SettingsSkeleton() {
  return (
    <div className="divide-y divide-gray-200 *:py-10 *:first:pt-0 *:last:pb-0">
      <div className="space-y-8">
        <p className="text-bunker-900 font-semibold">Profile photo</p>
        <Skeleton className="h-12" />
      </div>
      <div className="space-y-8">
        <p className="text-bunker-900 font-semibold">Personal details</p>
        <Skeleton className="h-64" />
      </div>
      <div className="space-y-8">
        <p className="text-bunker-900 font-semibold">Password</p>
        <Skeleton className="h-64" />
      </div>
      <div className="space-y-8">
        <p className="text-bunker-900 font-semibold">Password</p>
        <Skeleton className="h-40" />
      </div>
    </div>
  );
}
