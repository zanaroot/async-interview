'use client';

import { membersQuery } from '@/actions/organization/get-members';
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

type Row = Awaited<ReturnType<typeof membersQuery>>[number];

export const MemberTable = () => {
  const t = useScopedI18n('member-table');

  const columns: ColumnDef<Row>[] = [
    {
      accessorKey: 'user.username',
      header: t('name-column'),
    },
    {
      accessorKey: 'user.email',
      header: t('email-column'),
    },
    {
      accessorKey: 'user.phone',
      header: t('phone-column'),
    },
    {
      accessorKey: 'id',
      header: t('action-column'),
      cell: ({ row }) => (
        <Link href={`/user/${row.original.userId}`}>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <Eye className='h-4 w-4' />
          </Button>
        </Link>
      ),
    },
  ];

  const { data, isFetching } = useQuery({
    queryKey: ['members'],
    queryFn: () => membersQuery(),
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className='bg-card'>
      <TableCaption>{t('table-title')}</TableCaption>
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
              {t('no-results')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
