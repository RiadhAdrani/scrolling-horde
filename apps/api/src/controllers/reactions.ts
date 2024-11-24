import $prisma from '@db/prisma.js';
import { $error } from '@helpers/errors.js';
import { $success } from '@helpers/request.js';
import httpStatus from '@helpers/status.js';
import { Comment, Post, Prisma, Reaction, User } from '@prisma/client';
import type { AddReactionBody } from '@shared-types/reactions.js';
import reactionValidators from '@validators/reaction.js';

export type ReactionTarget = { type: 'post'; post: Post } | { type: 'comment'; comment: Comment };

export const addReaction = async (user: User, subject: ReactionTarget, _body: AddReactionBody, reaction?: Reaction) => {
  const body = reactionValidators.create.parse(_body);

  const data: Prisma.ReactionCreateArgs['data'] = {
    userId: user.id,
    postId: subject.type === 'post' ? subject.post.id : undefined,
    commentId: subject.type === 'comment' ? subject.comment.id : undefined,
    type: body.type,
  };

  if (!reaction) {
    reaction = await $prisma.reaction.create({ data });
  } else if (reaction.type !== body.type) {
    reaction = await $prisma.reaction.update({ where: { id: reaction.id }, data: { type: body.type } });
  }

  return $success(reaction);
};

export const removeReaction = async (user: User, reaction: Reaction) => {
  if (reaction.userId !== user.id) {
    throw $error(httpStatus.FORBIDDEN, 'reactions.forbidden');
  }

  await $prisma.reaction.delete({ where: { id: reaction.id } });

  return $success();
};
