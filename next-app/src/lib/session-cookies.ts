import { cookies } from 'next/headers';

export const setSessionTokenCookie = async (
  token: string,
  expiresAt: Date
): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
  });
};

export const deleteSessionTokenCookie = async (): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
};

export const getSessionTokenCookie = async (): Promise<string | null> => {
  const cookieStore = await cookies();

  return cookieStore.get('session')?.value ?? null;
};
