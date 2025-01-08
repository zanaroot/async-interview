'use client';

import { Bell } from 'lucide-react';

import { LogOut } from 'lucide-react';

import { signoutMutation } from '@/actions/auth/signout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { useSession } from '@/hooks/use-session';
import { useMutation } from '@tanstack/react-query';
import { ChevronsUpDown, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useScopedI18n } from '@/packages/locales/client';

export const SidebarUser = () => {
  const { data: session } = useSession();
  const t = useScopedI18n('side-bar-user');

  const { isMobile } = useSidebar();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: signoutMutation,
    onSuccess: () => {
      router.push('/');
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage
              src={session?.user?.image ?? undefined}
              alt={session?.user?.username}
            />
            <AvatarFallback className='rounded-lg uppercase'>
              {session?.user?.username.charAt(0)}
              {session?.user?.username.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>
              {session?.user?.username}
            </span>
            <span className='truncate text-xs'>{session?.user?.email}</span>
          </div>
          <ChevronsUpDown className='ml-auto size-4' />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-card'
        side={isMobile ? 'bottom' : 'right'}
        align='end'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => router.push(`/profile`)}
          >
            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={session?.user?.image ?? undefined}
                  alt={session?.user?.username}
                />
                <AvatarFallback className='rounded-lg uppercase'>
                  {session?.user?.username.charAt(0)}
                  {session?.user?.username.charAt(1)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {session?.user?.username}
                </span>
                <span className='truncate text-xs'>{session?.user?.email}</span>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>
            <Sparkles />
            {t('buy-credits')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>
            <Bell />
            {t('notification')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-red-400'
          onClick={() => mutate()}
        >
          <LogOut />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
