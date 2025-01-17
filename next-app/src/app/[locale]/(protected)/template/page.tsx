'use client';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const [template, settemplate] = useState();
  const handleClick = () => {
    redirect('/list');
  };
  return (
    <div>
      {!template && (
        <div className='flex flex-col items-center justify-center space-y-4'>
          <p>Pas de template , veuillez crée un template</p>
          <Button onClick={handleClick}>Crée Template</Button>
        </div>
      )}
    </div>
  );
};

export default page;
