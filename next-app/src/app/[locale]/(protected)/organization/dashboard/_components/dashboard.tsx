'use client';

import { FullInformationsQuery } from '@/actions/organization/get-full-informations';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Building2, SquarePlay, Users, Video } from 'lucide-react';
import { InputInviteUserModal } from './input-invite-user-modal';
import { MemberTable } from './member-table';
import { useSession } from '@/hooks/use-session';
import { useScopedI18n } from '@/packages/locales/client';
import NumberTicker from '@/components/ui/number-ticker';
import { interviewPassedQuery } from '@/actions/interview/interview-passed';
import { allCandidateQuery } from '@/actions/candidate/get-all-candidate';
import { allinterviewQuery } from '@/actions/interview/all-interview';

export function Dashboard() {
  const { data: organization } = useQuery({
    queryKey: ['organization'],
    queryFn: () => FullInformationsQuery(),
  });

  const { data: interwiewpassed } = useQuery({
    queryKey: ['interwiewpassed'],
    queryFn: () => interviewPassedQuery(),
  });

  const { data: candidates } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => allCandidateQuery(),
  });

  const { data: allinterview } = useQuery({
    queryKey: ['allinterview'],
    queryFn: () => allinterviewQuery(),
  });

  const t = useScopedI18n('dashboard');
  const { data: session } = useSession();

  return (
    <div className='min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl p-6'>
        <div className='mb-12 rounded-xl bg-card p-6 shadow-sm dark:bg-gray-800/50'>
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight'>
                {organization?.name}
              </h1>
              <p className='mt-1 text-sm text-muted-foreground'>
                {t('description')}
              </p>
            </div>
            <Badge variant='secondary' className='h-9 px-4 py-2'>
              {t('creadits-remaining')}30
            </Badge>
          </div>
          <div className='mt-6 grid gap-1'>
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm'>
                {t('onwer-name')}
                {organization?.owner.username}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Building2 className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm'>
                {t('organization-description')}
                {organization?.description}
              </span>
            </div>
          </div>
        </div>
        <div className='mb-12 grid gap-6 md:grid-cols-3'>
          <Card className='relative overflow-hidden'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>
                interview number
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {allinterview === 0 ? (
                  0
                ) : (
                  <NumberTicker
                    value={allinterview ?? 0}
                    className='text-slate-300'
                  />
                )}{' '}
              </div>
              <div className='absolute right-4 top-4 text-muted-foreground/20'>
                <SquarePlay className='h-12 w-12' />
              </div>
            </CardContent>
          </Card>
          <Card className='relative overflow-hidden'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('interview-passed')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {interwiewpassed === 0 ? (
                  0
                ) : (
                  <NumberTicker
                    value={interwiewpassed ?? 0}
                    className='text-slate-300'
                  />
                )}{' '}
              </div>
              <div className='absolute right-4 top-4 text-muted-foreground/20'>
                <Video className='h-12 w-12' />
              </div>
            </CardContent>
          </Card>
          <Card className='relative overflow-hidden'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('candidates')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {candidates?.length === 0 ? (
                  0
                ) : (
                  <NumberTicker
                    value={candidates?.length ?? 0}
                    className='text-slate-300'
                  />
                )}{' '}
              </div>
              <div className='absolute right-4 top-4 text-muted-foreground/20'>
                <Users className='h-12 w-12' />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='rounded-xl bg-card p-6 shadow-sm dark:bg-gray-800/50'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>
              {t('organization-members')}
            </h2>
            {organization?.ownerId === session?.user?.id && (
              <InputInviteUserModal />
            )}
          </div>
          <div className='relative overflow-hidden'>
            <MemberTable />
          </div>
        </div>
      </div>
    </div>
  );
}
