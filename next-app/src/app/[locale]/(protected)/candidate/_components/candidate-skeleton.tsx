import { Skeleton } from '@/components/ui/skeleton';

export const CandidateSkeleton = () => (
  <div className='flex flex-col gap-12'>
    <Skeleton className='h-12 w-1/3' />
    <Skeleton className='h-12 w-1/3' />
    <Skeleton className='h-12 w-1/3' />
    <Skeleton className='h-96 w-full' />
  </div>
);
