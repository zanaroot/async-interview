'use server';

import { verifyPassword } from '@/lib/password';
import { setSessionTokenCookie } from '@/lib/session-cookies';
import { getOneOrganizationByUserId } from '@/models/organization/$get-one-by-user-id';
import { createSession } from '@/models/session';
import { userByEmailOrByUsername } from '@/models/user';
import { getScopedI18n } from '@/packages/locales/server';
import { signinValidator } from '@/validator/signin.validator';
import type { z } from 'zod';

type SigninInput = z.infer<ReturnType<typeof signinValidator>>;

export const signinMutation = async (input: SigninInput) => {
  const tError = await getScopedI18n('server-error');
  const tSignin = await getScopedI18n('signin-form');

  const validatedInput = signinValidator(tError).parse(input);

  const user = await userByEmailOrByUsername(validatedInput.emailOrUsername);

  if (!user) {
    throw tSignin('email-not-found');
  }

  const organization = await getOneOrganizationByUserId(user.id);

  const isPasswordValid = await verifyPassword(
    user.password,
    validatedInput.password
  );

  if (!isPasswordValid) {
    throw tSignin('invalid-credentials');
  }

  const organizationId = organization?.organizationId ?? null;

  const session = await createSession(user.id, organizationId);

  await setSessionTokenCookie(session.id, session.expiresAt);
};
