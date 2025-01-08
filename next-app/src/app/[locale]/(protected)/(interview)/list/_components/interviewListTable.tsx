'use client';

import { interviewListQuery } from '@/actions/interview/interview-list';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { SelectInterview } from '@/models/interview/type';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PaginationBar } from './paginationBar';
import { useScopedI18n } from '@/packages/locales/client';

const pageSize = 10;

export const InterviewListTable = () => {
  const t = useScopedI18n('interview-list');

  const columns: ColumnDef<SelectInterview>[] = [
    {
      accessorKey: 'name',
      header: t('name'),
    },
    {
      accessorKey: 'description',
      header: t('description'),
    },
    {
      accessorKey: 'candidate.email',
      header: t('candidate'),
    },
    {
      accessorKey: 'organization.name',
      header: t('organization'),
    },
    {
      accessorKey: 'status',
      header: t('status'),
    },
    {
      accessorKey: 'id',
      header: t('action'),
      cell: ({ row }) => (
        <Link href={`/list/details/${row.original.id}`}>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <Eye className='h-4 w-4' />
          </Button>
        </Link>
      ),
    },
  ];
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ['interviews', page],
    queryFn: () => interviewListQuery(page, pageSize),
  });

  const totalPages = data ? Math.ceil(data.length / pageSize) : 1;

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table className='bg-card'>
        <TableCaption>{t('description-caption')}</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {isFetching ? (
                      <Skeleton className='h-8 w-full' />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                {t('no-result')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <PaginationBar
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
