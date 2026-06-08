import React from 'react';
import { Skeleton } from './Skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="group border border-border bg-surface flex flex-col h-full overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-5 w-4/5 mb-2" />
          </div>
        </div>
        <div className="mt-auto pt-4 flex justify-between items-end gap-2">
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  );
}
