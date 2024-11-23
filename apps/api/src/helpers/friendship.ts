import $prisma from '@db/prisma.js';
import { Friendship } from '@prisma/client';
import { $error } from './errors.js';
import httpStatus from './status.js';

export const findFriendship = async <B extends boolean>(
  user1Id: string,
  user2Id: string,
  doThrow?: B,
): Promise<B extends true ? Friendship : Friendship | undefined> => {
  const item = await $prisma.friendship.findFirst({
    where: {
      OR: [
        { fromUserId: user1Id, toUserId: user2Id },
        { fromUserId: user2Id, toUserId: user1Id },
      ],
    },
  });

  if (!item && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'friendship.notFound');
  }

  return item as Friendship;
};
