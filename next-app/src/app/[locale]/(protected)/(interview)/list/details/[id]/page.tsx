import { oneInterviewQuery } from '@/actions/interview/get-one';
import CardInterview from '../../_components/CardInterview';

const DetailsInterviewPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const interview = await oneInterviewQuery((await params).id);
  const organisationId = interview?.organizationId
  return (
    <div>
      <CardInterview
        candidateName={interview?.candidate.name}
        interviewName={interview?.name}
        interviewDescription={interview?.description}
        interviewId={(await params).id}
        organisationId={organisationId}
      />
    </div>
  );
};

export default DetailsInterviewPage;
