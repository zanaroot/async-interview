'use server';

import { CandidateModel } from '@/models/candidate';
import type { CandidateUpdate } from '@/models/candidate/type';

export const updateCandidateMutation = async (
  candidatevalues: CandidateUpdate
) => {
  const candidateModel = new CandidateModel();
  const updatecandidate = await candidateModel.update(candidatevalues);
  return updatecandidate;
};
