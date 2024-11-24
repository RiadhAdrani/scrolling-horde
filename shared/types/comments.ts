import type { Comment } from './prisma.js';

export type CreateCommentBody = Pick<Comment, 'content'>;

export type UpdateCommentBody = Partial<Pick<Comment, 'content'>>;
