import { oneCandidateQuery } from '@/actions/candidate/get-candidate';
import getQueryClient from '@/packages/react-query';
import { CandidateDetails } from './_components/candidate-details';

const CandidateDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const client = getQueryClient();

  const candidateId = Number(id);

  client.prefetchQuery({
    queryKey: ['candidate', 'details', id],
    queryFn: () => oneCandidateQuery(candidateId),
  });

  return (
    <main className='min-h-screen bg-background'>
      <CandidateDetails id={candidateId} />
    </main>
  );
};

export default CandidateDetailsPage;
