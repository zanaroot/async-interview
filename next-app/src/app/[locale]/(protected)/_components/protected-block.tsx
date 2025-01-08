'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const generateBreadcrumbs = (
  path: string
): { label: string; href: string }[] => {
  const pathSegments = path.replace(/^\/|\/$/g, '').split('/');

  return pathSegments.map((segment, index) => {
    const decodedSegment = decodeURIComponent(segment);

    const label = decodedSegment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const href = '/' + pathSegments.slice(0, index + 1).join('/');

    return {
      label,
      href,
    };
  });
};

export const ProtectedBlock = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <>
      <header className='sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 bg-background px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map(({ label, href }, index) => (
              <Fragment key={href}>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem key={href} className='hidden md:block'>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
    </>
  );
};
