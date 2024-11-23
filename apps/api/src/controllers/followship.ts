import $prisma from '@db/prisma.js';
import { findFollowship } from '@helpers/followship.js';
import { $success } from '@helpers/request.js';
import { User } from '@prisma/client';

export const followUser = async (user: User, target: User) => {
  const followship = await findFollowship(user.id, target.id);

  if (!followship) {
    await $prisma.followship.create({ data: { userId: user.id, targetId: target.id } });
  }

  return $success(true);
};

export const unfollowUser = async (user: User, target: User) => {
  const followship = await findFollowship(user.id, target.id);

  if (followship) {
    await $prisma.followship.delete({ where: { id: followship.id } });
  }

  return $success(true);
};
