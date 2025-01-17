'use client';
import { Loader, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useScopedI18n } from '@/packages/locales/client';
import { Bell } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getallUserNotificationQuery } from '@/actions/notification/get-all-usernotification';
import Link from 'next/link';
import { deleteNotificationMutation } from '@/actions/notification/delete-notification';
import { toast } from '@/hooks/use-toast';
import { updateStatusNotificationMutation } from '@/actions/notification/update-status-notification';
import { Skeleton } from '@/components/ui/skeleton';

export const Notification = () => {
  const client = useQueryClient();

  const t = useScopedI18n('side-bar-user');

  const { data, isFetching } = useQuery({
    queryKey: ['usernotification'],
    queryFn: () => getallUserNotificationQuery(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['deletenotification'],
    mutationFn: deleteNotificationMutation,
    onSuccess: () => {
      toast({
        title: t('notification'),
        description: t('notification'),
      });

      client.invalidateQueries({ queryKey: ['usernotification'] });
    },

    onError: (error) => {
      toast({
        title: t('notification'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationKey: ['updatestatus'],
    mutationFn: updateStatusNotificationMutation,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['usernotification'] });
    },

    onError: (error) => {
      toast({
        title: t('notification'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteNotification = async (idNotification: number) => {
    return await mutateAsync(idNotification as number);
  };

  const updateStatusNotification = async (idNotification: number) => {
    return await updateStatus(idNotification as number);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-600 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
          <Bell />
          {t('notification')}
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>Your list of notifications.</DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            {data?.map((item, key) => {
              return (
                <div key={key}>
                  {item.notification?.values === undefined ? (
                    ''
                  ) : (
                    <div
                      className={`flex space-x-6 ${item.notification?.status === 'dismiss' ? 'bg-slate-900' : ''}`}
                    >
                      <Link
                        href={`${item.notification?.url as string}`}
                        target='_blank'
                      >
                        {isFetching ? (
                          <Skeleton />
                        ) : (
                          <li
                            onClick={() =>
                              updateStatusNotification(
                                item.notification?.id as number
                              )
                            }
                          >
                            {' '}
                            {item.notification?.values}
                          </li>
                        )}
                      </Link>

                      {isPending ? (
                        <Loader />
                      ) : (
                        <Trash2
                          onClick={() =>
                            deleteNotification(item.notification?.id as number)
                          }
                          color='red'
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
