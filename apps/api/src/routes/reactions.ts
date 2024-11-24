import { addReaction, removeReaction } from '@controllers/reactions.js';
import {
  optionalCommentReactionMiddleware,
  optionalPostReactionMiddleware,
  reactionMiddleware,
} from '@middlewares/index.js';
import { Hono } from 'hono';

const reaction = new Hono().use(reactionMiddleware);
reaction.delete('/', async ctx => ctx.json(await removeReaction(ctx.get('user'), ctx.get('reaction'))));

const postReactions = new Hono().use(optionalPostReactionMiddleware);
postReactions.post('/', async ctx => {
  const user = ctx.get('user');
  const subject = { type: 'post', post: ctx.get('post') } as const;
  const reaction = ctx.get('reaction');
  const body = await ctx.req.json();

  return ctx.json(await addReaction(user, subject, body, reaction));
});
postReactions.route('/:reactionId', reaction);

const commentReactions = new Hono().use(optionalCommentReactionMiddleware);
commentReactions.post('/', async ctx => {
  const user = ctx.get('user');
  const subject = { type: 'comment', comment: ctx.get('comment') } as const;
  const reaction = ctx.get('reaction');
  const body = await ctx.req.json();

  return ctx.json(await addReaction(user, subject, body, reaction));
});
commentReactions.route('/:reactionId', reaction);

export { postReactions, commentReactions };
