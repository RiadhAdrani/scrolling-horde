import { createPost, deletePost, editPost, sharePost } from '@controllers/posts.js';
import { AuthContextData } from '@middlewares/auth.js';
import postMiddleware from '@middlewares/post.js';
import { Hono } from 'hono';

const posts = new Hono<{ Variables: AuthContextData }>();
posts.post('/', async ctx => ctx.json(await createPost(ctx.get('user'), await ctx.req.json())));

const post = new Hono().use(postMiddleware);
post.patch('/', async ctx => ctx.json(await editPost(ctx.get('user'), ctx.get('post'), await ctx.req.json())));
post.delete('/', async ctx => ctx.json(await deletePost(ctx.get('user'), ctx.get('post'))));
post.post('/share', async ctx => ctx.json(await sharePost(ctx.get('user'), ctx.get('post'), await ctx.req.json())));

posts.route('/:postId', post);

export default posts;
