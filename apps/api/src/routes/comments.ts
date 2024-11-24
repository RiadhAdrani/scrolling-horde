import { createComment, deleteComment, editComment } from '@controllers/comments.js';
import commentMiddleware from '@middlewares/comment.js';
import { PostContextData } from '@middlewares/post.js';
import { Hono } from 'hono';

const comments = new Hono<{ Variables: PostContextData }>();
comments.post('/', async ctx => ctx.json(await createComment(ctx.get('user'), ctx.get('post'), await ctx.req.json())));

const comment = new Hono().use(commentMiddleware);
comment.patch('/', async ctx => ctx.json(await editComment(ctx.get('user'), ctx.get('comment'), await ctx.req.json())));
comment.delete('/', async ctx => ctx.json(await deleteComment(ctx.get('user'), ctx.get('comment'))));

comments.route('/:commentId', comment);

export default comments;
