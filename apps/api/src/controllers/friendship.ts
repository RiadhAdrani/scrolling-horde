import $prisma from '@db/prisma.js';
import { $success } from '@helpers/request.js';
import { Friendship, InvitationStatus, User } from '@prisma/client';

export const requestFriendship = async (user: User, target: User, friendship?: Friendship) => {
  // check if friendship already exists
  if (!friendship) {
    await $prisma.$transaction([
      $prisma.friendship.create({
        data: { state: InvitationStatus.Pending, fromUserId: user.id, toUserId: target.id },
      }),
      $prisma.followship.create({ data: { userId: user.id, targetId: target.id } }),
    ]);
  } else if (friendship.state !== InvitationStatus.Accepted) {
    await $prisma.friendship.update({
      where: { id: friendship.id },
      data: { state: InvitationStatus.Pending },
    });
  }

  return $success(true);
};

export const acceptFriendship = async (user: User, target: User, friendship: Friendship) => {
  await $prisma.$transaction([
    $prisma.friendship.update({ where: { id: friendship.id }, data: { state: InvitationStatus.Accepted } }),
    $prisma.followship.create({ data: { userId: user.id, targetId: target.id } }),
  ]);

  return $success(true);
};

export const declineFriendship = async (friendship: Friendship) => {
  await $prisma.friendship.update({
    where: { id: friendship.id },
    data: { state: InvitationStatus.Rejected },
  });

  return $success(true);
};

export const removeFriendship = async (friendship: Friendship) => {
  await $prisma.friendship.delete({ where: { id: friendship.id } });

  return $success(true);
};
