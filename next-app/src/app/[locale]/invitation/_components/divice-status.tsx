import type { ElementType } from 'react';

export const DeviceStatus = ({
  icon: Icon,
  label,
}: {
  icon: ElementType;
  label: string;
}) => (
  <div className='flex flex-col items-center space-y-2'>
    <div className='flex h-14 w-14 items-center justify-center rounded-full bg-blue-100'>
      <Icon className='h-7 w-7 text-blue-600' />
    </div>
    <span className='text-sm font-medium text-gray-700'>{label}</span>
  </div>
);
