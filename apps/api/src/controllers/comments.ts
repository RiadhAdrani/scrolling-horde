import $prisma from '@db/prisma.js';
import { $error } from '@helpers/errors.js';
import { $success } from '@helpers/request.js';
import httpStatus from '@helpers/status.js';
import { Comment, Post, User } from '@prisma/client';
import { pick } from '@riadh-adrani/obj-utils';
import { CreateCommentBody, UpdateCommentBody } from '@shared-types/comments.js';
import { commentValidators } from '@validators/comment.js';

export const createComment = async (user: User, post: Post, _body: CreateCommentBody) => {
  const body = commentValidators.create.parse(_body);

  const comment = await $prisma.comment.create({ data: { content: body.text, authorId: user.id, postId: post.id } });

  return $success(comment);
};

export const editComment = async (user: User, comment: Comment, _body: UpdateCommentBody) => {
  const body = commentValidators.update.parse(_body);

  if (comment.authorId !== user.id) {
    throw $error(httpStatus.FORBIDDEN, 'comments.forbidden');
  }

  if (Object.keys(body).length > 0) {
    const versionData = pick(comment, 'content', 'authorId', 'postId');

    [comment] = await $prisma.$transaction([
      $prisma.comment.update({ where: { id: comment.id }, data: { content: body.text } }),
      $prisma.comment.create({ data: { ...versionData, createdAt: comment.updatedAt } }),
    ]);
  }

  return $success(comment);
};

export const deleteComment = async (user: User, comment: Comment) => {
  if (comment.authorId !== user.id) {
    throw $error(httpStatus.FORBIDDEN, 'comments.forbidden');
  }

  await $prisma.comment.delete({ where: { id: comment.id } });

  return $success();
};
