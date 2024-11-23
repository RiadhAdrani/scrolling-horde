import type { Post } from './prisma.js';

export type CreatePostBody = Pick<Post, 'text'>;

export type UpdatePostBody = Partial<Pick<Post, 'text'>>;

export type SharePostBody = Partial<Pick<Post, 'text'>>;
