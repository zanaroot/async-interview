import { hash, verify } from '@node-rs/argon2';

const HASH_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
} as const;

export const hashPassword = async (password: string): Promise<string> =>
  hash(password, HASH_OPTIONS);

export const verifyPassword = async (
  hashedPassword: string,
  inputPassword: string
) => {
  const isValid = await verify(hashedPassword, inputPassword);

  if (!isValid) {
    throw 'Invalid password';
  }

  return isValid;
};
