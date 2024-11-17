import $prisma from '@db/prisma.js';
import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { User } from '@prisma/client';

const findById = async <B extends boolean>(
  id: string,
  doThrow?: B,
): Promise<B extends true ? User : User | undefined> => {
  const user = await $prisma.user.findUnique({ where: { id } });

  if (!user && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'users.notFound');
  }

  return user as User;
};

const findByEmail = async <B extends boolean>(
  email: string,
  doThrow?: B,
): Promise<B extends true ? User : User | undefined> => {
  const user = await $prisma.user.findFirst({ where: { email } });

  if (!user && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'users.notFound');
  }

  return user as User;
};

const findByEmailAndPassword = async <B extends boolean>(
  email: string,
  password: string,
  doThrow?: B,
): Promise<B extends true ? User : User | undefined> => {
  const user = await $prisma.user.findFirst({ where: { email: email, password } });

  if (!user && doThrow) {
    throw $error(httpStatus.UNAUTHORIZED, 'users.notFound');
  }

  return user as User;
};

const updateOne = async (
  id: string,
  data: Partial<Pick<User, 'email' | 'lastname' | 'password' | 'firstname'>>,
): Promise<User> => await $prisma.user.update({ where: { id }, data });

const $user = {
  findOne: {
    byId: findById,
    byEmail: findByEmail,
    byEmailAndPassword: findByEmailAndPassword,
  },
  create: {},
  update: {
    one: updateOne,
  },
};

export default $user;
