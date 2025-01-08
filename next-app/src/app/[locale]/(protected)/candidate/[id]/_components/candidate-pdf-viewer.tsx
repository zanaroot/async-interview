import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useScopedI18n } from '@/packages/locales/client';

export const CandidatePDFViewer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [viewresume, setviewresume] = useState(false);

  const t = useScopedI18n('candidate-pdf-viewer');

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleclickopen = () => setviewresume(true);
  const handleclickclose = () => setviewresume(false);

  return (
    <div>
      <Button variant={'outline'} onClick={() => handleclickopen()}>
        {t('trigger')}
      </Button>

      {viewresume ? (
        <div>
          <div className='bg-opacity-50r absolute inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-600'>
            <div className='flex flex-col'>
              <div className='absolute right-4 top-4 z-50 cursor-pointer'>
                <XCircle onClick={() => handleclickclose()} />
              </div>

              <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <Button
                onClick={() => setPageNumber((prev) => prev - 1)}
                disabled={pageNumber === 1}
                className='absolute left-0 top-80 z-50 rounded-e-full'
                size={'icon'}
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                onClick={() => setPageNumber((prev) => prev + 1)}
                disabled={pageNumber === numPages}
                className='absolute right-0 top-80 z-50 rounded-s-full'
                size={'icon'}
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
