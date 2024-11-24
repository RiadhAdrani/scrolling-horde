import { getMe, signin, signup } from '@controllers/users.js';
import { authMiddleware, AuthContextData } from '@middlewares/index.js';
import { Hono } from 'hono';
import friendships from './friendship.js';
import followships from './followship.js';
import posts from './posts.js';

const users = new Hono();
const me = new Hono<{ Variables: AuthContextData }>();

users.post('/signup', async ctx => ctx.json(await signup(await ctx.req.json())));
users.post('/signin', async ctx => ctx.json(await signin(await ctx.req.json())));

me.use(authMiddleware);
me.get('/', async ctx => ctx.json(await getMe(ctx.get('user'))));
me.route('/friendships', friendships);
me.route('/followships', followships);
me.route('/posts', posts);

users.route('/me', me);

export default users;
