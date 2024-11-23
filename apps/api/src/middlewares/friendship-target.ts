import { findFriendship } from '@helpers/friendship.js';
import { Friendship, User } from '@prisma/client';
import { MiddlewareHandler } from 'hono';
import { AuthContextData } from './auth.js';
import httpStatus from '@helpers/status.js';
import { $error } from '@helpers/errors.js';
import { findUserById } from '@helpers/users.js';

export type FriendshipTargetContextData = AuthContextData & {
  friendship?: Friendship;
  target: User;
};

export type MiddlewareFn = MiddlewareHandler<{ Bindings: undefined; Variables: FriendshipTargetContextData }>;

const friendshipTargetMiddleware: MiddlewareFn = async (ctx, next) => {
  const targetId = ctx.req.param('targetId');

  if (!targetId) {
    throw $error(httpStatus.NOT_FOUND, 'user.notFound');
  }

  const target = await findUserById(targetId, true);
  ctx.set('target', target);

  const friendship = await findFriendship(ctx.get('user').id, targetId);
  if (friendship) {
    ctx.set('friendship', friendship);
  }

  await next();
};

export default friendshipTargetMiddleware;
