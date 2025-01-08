import { Card, CardContent } from '@/components/ui/card';
import { PersonalInformations } from './_components/personal-informations';
import { actionOrgSessionGuard } from '@/server-functions/session';

const ProfilePage = async () => {
  await actionOrgSessionGuard();
  return (
    <Card className='p-4'>
      <CardContent className='mx-auto max-w-2xl space-y-12'>
        <PersonalInformations />
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
