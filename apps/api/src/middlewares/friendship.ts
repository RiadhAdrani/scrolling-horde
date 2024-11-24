import { $error } from '@helpers/errors.js';
import { findFriendshipById } from '@helpers/friendship.js';
import httpStatus from '@helpers/status.js';
import { Friendship } from '@prisma/client';
import { TargetContextData } from './target-user.js';
import { MiddlewareHandlerFunction } from './type.js';

export type FriendshipOptionalContextData = TargetContextData & {
  friendship?: Friendship;
};

export type FriendshipContextData = FriendshipOptionalContextData & {
  friendship: Friendship;
};

export const friendshipMiddleware: MiddlewareHandlerFunction<FriendshipContextData> = async (ctx, next) => {
  if (!ctx.get('friendship')) {
    throw $error(httpStatus.NOT_FOUND, 'friendship.notFound');
  }

  await next();
};

export const optionalFriendshipMiddleware: MiddlewareHandlerFunction<FriendshipOptionalContextData> = async (
  ctx,
  next,
) => {
  const friendship = await findFriendshipById(ctx.get('user').id, ctx.get('target').id);
  if (friendship) {
    ctx.set('friendship', friendship);
  }

  await next();
};
