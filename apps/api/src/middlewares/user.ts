import { AUTHORIZATION, AUTHORIZATION_BEARER } from '@const/index.js';
import $token from '@models/token.js';
import $user from '@models/user.js';
import { User } from '@prisma/client';
import { MiddlewareHandler } from 'hono';

export type UserContextData = {
  user?: User;
};

export type MiddlewareFn = MiddlewareHandler<{ Bindings: undefined; Variables: UserContextData }>;

const userMiddleware: MiddlewareFn = async (ctx, next) => {
  const bearer = ctx.req.header(AUTHORIZATION);

  // extract token
  if (bearer && bearer.startsWith(AUTHORIZATION_BEARER)) {
    const token = bearer.substring(AUTHORIZATION_BEARER.length + 1);

    // verify token
    try {
      const { userId } = await $token.verify(token);

      const user = await $user.findOne.byId(userId);

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

export default userMiddleware;
