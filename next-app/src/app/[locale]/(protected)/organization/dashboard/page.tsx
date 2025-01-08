import { actionOrgSessionGuard } from '@/server-functions/session';
import { CardNoOrganization } from '../_components/card-no-organization';
import { Dashboard } from './_components/dashboard';

export const DashboardPage = async () => {
  const session = await actionOrgSessionGuard();

  return (
    <main>
      {!session.organizationId ? (
        <div className='flex items-center justify-center'>
          <CardNoOrganization />
        </div>
      ) : (
        <Dashboard />
      )}
    </main>
  );
};

export default DashboardPage;
