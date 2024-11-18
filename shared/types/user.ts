import type { User } from './prisma.js';

export type PublicUserData = Pick<
  User,
  'activatedAt' | 'createdAt' | 'email' | 'firstname' | 'lastname' | 'id' | 'theme' | 'updatedAt'
>;

export type SignUpBody = Pick<User, 'email' | 'firstname' | 'lastname' | 'password'>;
export type SignUpResponse = { user: PublicUserData; token: string };

export type SignInBody = Pick<User, 'email' | 'password'>;
export type SignInResponse = { user: PublicUserData; token: string };
