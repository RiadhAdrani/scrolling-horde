import { AUTHORIZATION, AUTHORIZATION_BEARER } from '@const/index.js';
import { verifyToken } from '@helpers/tokens.js';
import { findUserById } from '@helpers/users.js';
import { User } from '@prisma/client';
import { MiddlewareHandlerFunction } from './type.js';

export type UserContextData = {
  user?: User;
};

export const userMiddleware: MiddlewareHandlerFunction<UserContextData> = async (ctx, next) => {
  const bearer = ctx.req.header(AUTHORIZATION);

  // extract token
  if (bearer && bearer.startsWith(AUTHORIZATION_BEARER)) {
    const token = bearer.substring(AUTHORIZATION_BEARER.length + 1);

    // verify token
    try {
      const { userId } = await verifyToken(token);

      const user = await findUserById(userId);

      if (user) {
        ctx.set('user', user);
      }
    } catch (e) {
      // we continue without setting user
    }
  }

  // TODO: extract i18n language

  await next();
};
