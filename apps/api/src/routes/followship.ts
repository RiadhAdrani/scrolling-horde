import { followUser, unfollowUser } from '@controllers/followship.js';
import { targetUserMiddleware } from '@middlewares/index.js';
import { Hono } from 'hono';

const followships = new Hono().post('/');

const target = new Hono()
  .use(targetUserMiddleware)
  .post('/', async ctx => ctx.json(await followUser(ctx.get('user'), ctx.get('target'))))
  .delete('/', async ctx => ctx.json(await unfollowUser(ctx.get('user'), ctx.get('target'))));

followships.route('/:targetId', target);

export default followships;
