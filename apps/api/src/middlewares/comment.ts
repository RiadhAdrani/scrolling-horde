import { findCommentById } from '@helpers/comments.js';
import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { Comment } from '@prisma/client';
import { PostContextData } from './post.js';
import { MiddlewareHandlerFunction } from './type.js';

export type CommentContextData = PostContextData & {
  comment: Comment;
};

export const commentMiddleware: MiddlewareHandlerFunction<CommentContextData> = async (ctx, next) => {
  const id = ctx.req.param('commentId');
  if (!id) {
    throw $error(httpStatus.NOT_FOUND, 'comments.notFound');
  }

  const comment = await findCommentById(id, true);
  ctx.set('comment', comment);

  await next();
};
