import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { findUserById } from '@helpers/users.js';
import { User } from '@prisma/client';
import { AuthContextData } from './auth.js';
import { MiddlewareHandlerFunction } from './type.js';

export type TargetContextData = AuthContextData & {
  target: User;
};

export const targetUserMiddleware: MiddlewareHandlerFunction<TargetContextData> = async (ctx, next) => {
  const targetId = ctx.req.param('targetId');

  if (!targetId) {
    throw $error(httpStatus.NOT_FOUND, 'user.notFound');
  }

  const target = await findUserById(targetId, true);
  ctx.set('target', target);

  await next();
};
