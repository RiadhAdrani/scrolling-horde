import $prisma from '@db/prisma.js';
import { Followship } from '@prisma/client';
import { $error } from './errors.js';
import httpStatus from './status.js';

export const findFollowship = async <B extends boolean>(
  user1: string,
  user2: string,
  doThrow?: B,
): Promise<B extends true ? Followship : Followship | undefined> => {
  const item = await $prisma.followship.findFirst({
    where: {
      OR: [
        { userId: user1, targetId: user2 },
        { userId: user2, targetId: user1 },
      ],
    },
  });

  if (!item && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'followship.notFound');
  }

  return item as Followship;
};
