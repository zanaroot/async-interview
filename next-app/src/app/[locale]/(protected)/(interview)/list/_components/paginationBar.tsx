import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PaginationBar = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  return (
    <div className='mt-4 flex items-center justify-center gap-2'>
      <Button
        variant='outline'
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        size={'icon'}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>
      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index + 1}
          variant={currentPage === index + 1 ? 'default' : 'outline'}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        variant='outline'
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        size={'icon'}
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
};
