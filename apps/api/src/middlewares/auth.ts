import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { User } from '@prisma/client';
import { MiddlewareHandler } from 'hono';

export type AuthContextData = {
  user: User;
};

export type MiddlewareFn = MiddlewareHandler<{ Bindings: undefined; Variables: AuthContextData }>;

const authMiddleware: MiddlewareFn = async (ctx, next) => {
  const user = ctx.get('user');

  if (!user) {
    throw $error(httpStatus.UNAUTHORIZED, 'users.notFound');
  }

  await next();
};

export default authMiddleware;
