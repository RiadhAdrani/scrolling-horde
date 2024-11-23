import { findFriendship } from '@helpers/friendship.js';
import { Friendship } from '@prisma/client';
import { MiddlewareHandler } from 'hono';
import { TargetContextData } from './target-user.js';

export type FriendshipTargetContextData = TargetContextData & {
  friendship?: Friendship;
};

export type MiddlewareFn = MiddlewareHandler<{ Bindings: undefined; Variables: FriendshipTargetContextData }>;

const optionalFriendshipMiddleware: MiddlewareFn = async (ctx, next) => {
  const friendship = await findFriendship(ctx.get('user').id, ctx.get('target').id);
  if (friendship) {
    ctx.set('friendship', friendship);
  }

  await next();
};

export default optionalFriendshipMiddleware;
