import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { User } from '@prisma/client';
import { MiddlewareHandlerFunction } from './type.js';

export type AuthContextData = {
  user: User;
};

export const authMiddleware: MiddlewareHandlerFunction<AuthContextData> = async (ctx, next) => {
  const user = ctx.get('user');

  if (!user) {
    throw $error(httpStatus.UNAUTHORIZED, 'users.notFound');
  }

  await next();
};
