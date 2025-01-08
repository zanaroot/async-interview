import { getOneOrganizationQuery } from '@/actions/organization/get-one-organization';
import { getSession } from '@/server-functions/session';
import { CardNoOrganization } from '../_components/card-no-organization';
import { MembresScope } from './_components/membres-scope';
import { OwnerScope } from './_components/owner-scope';

const ManageOrganizationPage = async () => {
  const { session, organization } = await getSession();

  const organizationId = organization?.id;

  if (!organizationId) {
    return (
      <div className='flex items-center justify-center'>
        <CardNoOrganization />
      </div>
    );
  }

  const org = await getOneOrganizationQuery(organization);

  return (
    <div>
      {org && (
        <div>
          {session?.userId === org?.ownerId ? <OwnerScope /> : <MembresScope />}
        </div>
      )}
    </div>
  );
};

export default ManageOrganizationPage;
