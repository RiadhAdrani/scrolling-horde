import { findCommentById } from '@helpers/comments.js';
import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { Comment } from '@prisma/client';
import { MiddlewareHandler } from 'hono';
import { PostContextData } from './post.js';

export type CommentContextData = PostContextData & {
  comment: Comment;
};

export type MiddlewareFn = MiddlewareHandler<{ Bindings: undefined; Variables: CommentContextData }>;

const commentMiddleware: MiddlewareFn = async (ctx, next) => {
  const id = ctx.req.param('commentId');
  if (!id) {
    throw $error(httpStatus.NOT_FOUND, 'comments.notFound');
  }

  const post = await findCommentById(id, true);
  ctx.set('comment', post);

  await next();
};

export default commentMiddleware;
