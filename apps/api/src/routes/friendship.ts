import { acceptFriendship, removeFriendship, requestFriendship } from '@controllers/friendship.js';
import optionalFriendshipMiddleware from '@middlewares/friendship-target.js';
import friendshipMiddleware from '@middlewares/friendship.js';
import targetUserMiddleware from '@middlewares/target-user.js';
import { Hono } from 'hono';

const friendships = new Hono();

const target = new Hono()
  .use(targetUserMiddleware)
  .use(optionalFriendshipMiddleware)
  .post('/', async ctx => ctx.json(await requestFriendship(ctx.get('user'), ctx.get('target'), ctx.get('friendship'))));

const friendship = new Hono()
  .use(friendshipMiddleware)
  .post('/answer', async ctx =>
    ctx.json(await acceptFriendship(ctx.get('user'), ctx.get('target'), ctx.get('friendship'))),
  )
  .delete('/answer', async ctx =>
    ctx.json(await acceptFriendship(ctx.get('user'), ctx.get('target'), ctx.get('friendship'))),
  )
  .delete('/', async ctx => ctx.json(await removeFriendship(ctx.get('friendship'))));

target.route('/', friendship);
friendships.route('/:targetId', target);

export default friendships;
