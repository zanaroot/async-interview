import { actionSessionGuard } from '@/server-functions/session';
import { CreateOrganizationForm } from './_components/create-organization-form';

const OrganizationCreatePage = async () => {
  await actionSessionGuard();
  return (
    <div>
      <CreateOrganizationForm />
    </div>
  );
};

export default OrganizationCreatePage;
