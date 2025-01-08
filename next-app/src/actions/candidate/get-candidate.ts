'use server';

import { getCandidateById } from '@/models/candidate/$get-candidate-by-id';
import { actionOrgSessionGuard } from '@/server-functions/session';
import { getScopedI18n } from '@/packages/locales/server';

export const oneCandidateQuery = async (id: number) => {
  const session = await actionOrgSessionGuard();
  const tError = await getScopedI18n('server-error');

  const candidate = await getCandidateById(id, session.organizationId);

  if (!candidate) {
    throw tError('candidate-does-not-exist');
  }

  return candidate;
};
