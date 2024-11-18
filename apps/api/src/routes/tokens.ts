import { checkToken } from '@controllers/tokens.js';
import { Hono } from 'hono';

const tokens = new Hono();

tokens.post('/', async ctx => ctx.json(await checkToken(await ctx.req.text())));

export default tokens;
