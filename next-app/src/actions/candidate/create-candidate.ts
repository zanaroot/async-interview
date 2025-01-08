'use server';

import { createCandidate } from '@/models/candidate/$create-candidate';
import { zCandidateCreate, type CandidateInput } from '@/models/candidate/type';
import { actionOrgSessionGuard } from '@/server-functions/session';

export const createCandidateMutation = async (
  candidate: Omit<CandidateInput, 'organizationId'>
) => {
  const session = await actionOrgSessionGuard();

  const insertCandidate = zCandidateCreate.parse({
    ...candidate,
    organizationId: session.organizationId,
  });

  const [result] = await createCandidate(insertCandidate);

  return result;
};
