'use client';

import { switchSessionOrganizationMutation } from '@/actions/auth/switch-session-organization';
import { OrganizationsQuery } from '@/actions/organization/get-organizations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from '@/hooks/use-session';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/packages/locales/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronsUpDown, Plus } from 'lucide-react';
import Link from 'next/link';

export const OrganizationSwitcher = () => {
  const tOrganizationSwitcher = useScopedI18n('organization-switcher');
  const { data: session } = useSession();
  const { data: organizations } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      const orgs = await OrganizationsQuery(session?.user?.id);
      return orgs;
    },
    enabled: !!session?.user?.id,
  });
  const { isMobile } = useSidebar();
  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: switchSessionOrganizationMutation,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: tOrganizationSwitcher('toast-error-title'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleOrganizationClick = (organizationId: string) => {
    const userId = session?.user?.id;

    if (!userId) return;

    mutateAsync({ userId, organizationId });
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {session?.organization?.name ?? (
                    <Skeleton className='h-8 w-full' />
                  )}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-card'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              {tOrganizationSwitcher('organization-menu-label')}
            </DropdownMenuLabel>
            {isPending ? (
              <div>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
            ) : (
              organizations?.map((organization) => (
                <DropdownMenuItem
                  className={`cursor-pointer ${organization.organizationId === session?.organization?.id ? 'bg-accent/50' : ''}`}
                  key={organization.id}
                  onClick={() => {
                    handleOrganizationClick(organization.organizationId);
                  }}
                >
                  {organization.organization.name}
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href='/organization/create'
                prefetch
                className='flex w-full items-center gap-2'
              >
                <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                  <Plus className='size-4' />
                </div>
                <div className='font-medium text-muted-foreground'>
                  {tOrganizationSwitcher('create-organization')}
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
