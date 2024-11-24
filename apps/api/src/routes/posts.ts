import { createPost, deletePost, editPost, savePost, sharePost } from '@controllers/posts.js';
import { AuthContextData } from '@middlewares/auth.js';
import { postMiddleware } from '@middlewares/index.js';
import { Hono } from 'hono';
import comments from './comments.js';
import { postReactions } from './reactions.js';

const post = new Hono().use(postMiddleware);
post.patch('/', async ctx => ctx.json(await editPost(ctx.get('user'), ctx.get('post'), await ctx.req.json())));
post.delete('/', async ctx => ctx.json(await deletePost(ctx.get('user'), ctx.get('post'))));
post.post('/save', async ctx => ctx.json(await savePost(ctx.get('user'), ctx.get('post'))));
post.post('/share', async ctx => ctx.json(await sharePost(ctx.get('user'), ctx.get('post'), await ctx.req.json())));
post.route('/comments', comments);
post.route('/reactions', postReactions);

const posts = new Hono<{ Variables: AuthContextData }>();
posts.post('/', async ctx => ctx.json(await createPost(ctx.get('user'), await ctx.req.json())));
posts.route('/:postId', post);

export default posts;
