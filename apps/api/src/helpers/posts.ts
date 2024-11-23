import $prisma from '@db/prisma.js';
import { Post } from '@prisma/client';
import { $error } from './errors.js';
import httpStatus from './status.js';

export const findPostById = async <B extends boolean>(
  id: string,
  doThrow?: B,
): Promise<B extends true ? Post : Post | undefined> => {
  const item = await $prisma.post.findFirst({ where: { id } });

  if (!item && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'posts.notFound');
  }

  return item as Post;
};
