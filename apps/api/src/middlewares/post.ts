import { $error } from '@helpers/errors.js';
import { findPostById } from '@helpers/posts.js';
import httpStatus from '@helpers/status.js';
import { Post } from '@prisma/client';
import { AuthContextData } from './auth.js';
import { MiddlewareHandlerFunction } from './type.js';

export type PostContextData = AuthContextData & {
  post: Post;
};

export const postMiddleware: MiddlewareHandlerFunction<PostContextData> = async (ctx, next) => {
  const postId = ctx.req.param('postId');
  if (!postId) {
    throw $error(httpStatus.NOT_FOUND, 'posts.notFound');
  }

  const post = await findPostById(postId, true);
  ctx.set('post', post);

  await next();
};
