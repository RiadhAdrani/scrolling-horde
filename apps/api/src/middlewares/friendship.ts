import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { Friendship } from '@prisma/client';
import { MiddlewareHandler } from 'hono';
import { FriendshipTargetContextData } from './friendship-target.js';

export type FriendshipContextData = FriendshipTargetContextData & {
  friendship: Friendship;
};

export type MiddlewareFn = MiddlewareHandler<{ Bindings: undefined; Variables: FriendshipContextData }>;

const friendshipMiddleware: MiddlewareFn = async (ctx, next) => {
  if (!ctx.get('friendship')) {
    throw $error(httpStatus.NOT_FOUND, 'friendship.notFound');
  }

  await next();
};

export default friendshipMiddleware;
