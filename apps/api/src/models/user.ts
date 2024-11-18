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

const createOne = async (data: Pick<User, 'email' | 'firstname' | 'lastname' | 'password'>) =>
  $prisma.user.create({
    data,
    select: {
      activatedAt: true,
      createdAt: true,
      email: true,
      firstname: true,
      lastname: true,
      id: true,
      theme: true,
      updatedAt: true,
    },
  });

const updateOne = async (
  id: string,
  data: Partial<Pick<User, 'email' | 'lastname' | 'password' | 'firstname'>>,
): Promise<User> => await $prisma.user.update({ where: { id }, data });

const $user = {
  findOne: {
    byId: findById,
    byEmail: findByEmail,
  },
  create: {
    one: createOne,
  },
  update: {
    one: updateOne,
  },
};

export default $user;
