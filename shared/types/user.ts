import type { User, Post, Followship } from './prisma.js';

export type PublicUserData = Pick<User, 'createdAt' | 'email' | 'firstname' | 'lastname' | 'id' | 'theme'>;

export type PublicUserProfileData = PublicUserData & {
  posts: Array<Post>;
  friends: {
    users: Array<PublicUserData>;
    count: number;
  };
};

export type SignUpBody = Pick<User, 'email' | 'firstname' | 'lastname' | 'password'>;
export type SignUpResponse = { user: PublicUserData; token: string };

export type SignInBody = Pick<User, 'email' | 'password'>;
export type SignInResponse = { user: PublicUserData; token: string };
