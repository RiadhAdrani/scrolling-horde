import { createComment, createReply, deleteComment, editComment } from '@controllers/comments.js';
import { PostContextData, commentMiddleware, CommentContextData } from '@middlewares/index.js';
import { Hono } from 'hono';
import { commentReactions } from './reactions.js';

const comments = new Hono<{ Variables: PostContextData }>();
comments.post('/', async ctx => ctx.json(await createComment(ctx.get('user'), ctx.get('post'), await ctx.req.json())));

const comment = new Hono().use(commentMiddleware);
comment.patch('/', async ctx => ctx.json(await editComment(ctx.get('user'), ctx.get('comment'), await ctx.req.json())));
comment.delete('/', async ctx => ctx.json(await deleteComment(ctx.get('user'), ctx.get('comment'))));

const replies = new Hono<{ Variables: CommentContextData }>();
replies.post('/', async ctx =>
  ctx.json(await createReply(ctx.get('user'), ctx.get('comment'), ctx.get('post'), await ctx.req.json())),
);

comment.route('/replies', replies);
comment.route('/reactions', commentReactions);
comments.route('/:commentId', comment);

export default comments;
