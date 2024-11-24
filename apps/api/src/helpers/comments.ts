import $prisma from '@db/prisma.js';
import { Comment } from '@prisma/client';
import { $error } from './errors.js';
import httpStatus from './status.js';

export const findCommentById = async <B extends boolean>(
  id: string,
  doThrow?: B,
): Promise<B extends true ? Comment : Comment | undefined> => {
  const item = await $prisma.comment.findFirst({ where: { id } });

  if (!item && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'posts.notFound');
  }

  return item as Comment;
};
