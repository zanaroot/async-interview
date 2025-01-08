'use client';

import { allCandidateQuery } from '@/actions/candidate/get-all-candidate';
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
import type { Candidate } from '@/models/candidate/type';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useScopedI18n } from '@/packages/locales/client';

export const CandidateTable = () => {
  const t = useScopedI18n('candidate-table');

  const columns: ColumnDef<Candidate>[] = [
    {
      accessorKey: 'name',
      header: t('name'),
    },
    {
      accessorKey: 'email',
      header: t('email'),
    },
    {
      accessorKey: 'phone',
      header: t('phone'),
    },
    {
      accessorKey: 'id',
      header: t('action'),
      cell: ({ row }) => (
        <Link href={`/candidate/${row.original.id}`}>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <Eye className='h-4 w-4' />
          </Button>
        </Link>
      ),
    },
  ];

  const { data, isFetching } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => allCandidateQuery(),
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isFetching) return <Skeleton className='h-1/2 w-full' />;

  return (
    <Table className='bg-card'>
      <TableCaption>{t('list')}</TableCaption>
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};
