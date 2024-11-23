import $prisma from '@db/prisma.js';
import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { User } from '@prisma/client';

export const findUserById = async <B extends boolean>(
  id: string,
  doThrow?: B,
): Promise<B extends true ? User : User | undefined> => {
  const user = await $prisma.user.findUnique({ where: { id } });

  if (!user && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'users.notFound');
  }

  return user as User;
};

export const findUserByEmail = async <B extends boolean>(
  email: string,
  doThrow?: B,
): Promise<B extends true ? User : User | undefined> => {
  const user = await $prisma.user.findFirst({ where: { email } });

  if (!user && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'users.notFound');
  }

  return user as User;
};
