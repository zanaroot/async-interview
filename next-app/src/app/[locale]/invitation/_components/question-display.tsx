'use client';

import GradualSpacing from '@/components/ui/gradual-spacing';
import { Skeleton } from '@/components/ui/skeleton';

interface QuestionDisplayProps {
  isFetching: boolean;
  questionValue?: string;
}

export const QuestionDisplay = ({
  isFetching,
  questionValue,
}: QuestionDisplayProps) => {
  if (isFetching) {
    return <Skeleton className='h-12 w-1/3' />;
  }

  return (
    <GradualSpacing
      text={questionValue ? questionValue : 'No question available'}
    />
  );
};
