import CreateInterview from './_components/createInterview';
import { actionSessionGuard } from '@/server-functions/session';

const CreateInterviewPage = async () => {
  await actionSessionGuard();

  return (
    <div>
      <CreateInterview />
    </div>
  );
};

export default CreateInterviewPage;
