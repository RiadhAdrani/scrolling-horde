import { MiddlewareHandler } from 'hono';
import { Post } from '@prisma/client';
import { AuthContextData } from './auth.js';
import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { findPostById } from '@helpers/posts.js';

export type PostContextData = AuthContextData & {
  post: Post;
};

export type MiddlewareFn = MiddlewareHandler<{ Bindings: undefined; Variables: PostContextData }>;

const postMiddleware: MiddlewareFn = async (ctx, next) => {
  const postId = ctx.req.param('postId');
  if (!postId) {
    throw $error(httpStatus.NOT_FOUND, 'posts.notFound');
  }

  const post = await findPostById(postId, true);
  ctx.set('post', post);

  await next();
};

export default postMiddleware;
