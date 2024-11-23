import $prisma from '@db/prisma.js';
import { $error } from '@helpers/errors.js';
import { $success } from '@helpers/request.js';
import httpStatus from '@helpers/status.js';
import { Post, User } from '@prisma/client';
import { pick } from '@riadh-adrani/obj-utils';
import { CreatePostBody, SharePostBody, UpdatePostBody } from '@shared-types/posts.js';
import { postValidators } from '@validators/post.js';

export const createPost = async (user: User, _body: CreatePostBody) => {
  const body = postValidators.create.parse(_body);

  const post = await $prisma.post.create({
    data: {
      text: body.text,
      authorId: user.id,
    },
  });

  return $success(post);
};

export const editPost = async (user: User, post: Post, _body: UpdatePostBody) => {
  const body = postValidators.update.parse(_body);

  if (post.authorId !== user.id) {
    throw $error(httpStatus.FORBIDDEN, 'posts.forbidden');
  }

  if (Object.keys(body).length > 0) {
    // we need to create a new version
    const versionData = pick(post, 'authorId', 'text', 'originalId');

    [post] = await $prisma.$transaction([
      $prisma.post.update({ where: { id: post.id }, data: body }),
      $prisma.post.create({ data: { ...versionData, latestId: post.id, createdAt: post.updatedAt } }),
    ]);
  }

  return $success(post);
};

export const deletePost = async (user: User, post: Post) => {
  if (post.authorId !== user.id) {
    throw $error(httpStatus.FORBIDDEN, 'posts.forbidden');
  }

  await $prisma.post.delete({ where: { id: post.id } });

  return $success();
};

export const sharePost = async (user: User, post: Post, _body: SharePostBody) => {
  const body = postValidators.share.parse(_body);

  const shared = await $prisma.post.create({
    data: {
      text: body.text,
      authorId: user.id,
      originalId: post.id,
    },
  });

  return $success(shared);
};
