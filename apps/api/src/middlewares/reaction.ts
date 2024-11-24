import $prisma from '@db/prisma.js';
import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { Reaction } from '@prisma/client';
import { AuthContextData } from './auth.js';
import { MiddlewareHandlerFunction } from './type.js';
import { PostContextData } from './post.js';
import { CommentContextData } from './comment.js';

type BaseReactionContextData = AuthContextData & {
  reaction?: Reaction;
};

export type ReactionContextData = AuthContextData & {
  reaction: Reaction;
};

export const optionalPostReactionMiddleware: MiddlewareHandlerFunction<
  PostContextData & BaseReactionContextData
> = async (ctx, next) => {
  const post = ctx.get('post');
  const user = ctx.get('user');

  const reaction = await $prisma.reaction.findFirst({ where: { userId: user.id, postId: post.id } });
  ctx.set('reaction', reaction ?? undefined);

  await next();
};

export const optionalCommentReactionMiddleware: MiddlewareHandlerFunction<
  CommentContextData & BaseReactionContextData
> = async (ctx, next) => {
  const comment = ctx.get('comment');
  const user = ctx.get('user');

  const reaction = await $prisma.reaction.findFirst({ where: { userId: user.id, commentId: comment.id } });
  ctx.set('reaction', reaction ?? undefined);

  await next();
};

export const reactionMiddleware: MiddlewareHandlerFunction<
  (PostContextData | CommentContextData) & ReactionContextData
> = async (ctx, next) => {
  const reaction = ctx.get('reaction');

  if (!reaction) {
    throw $error(httpStatus.NOT_FOUND, 'reactions.notFound');
  }

  await next();
};
