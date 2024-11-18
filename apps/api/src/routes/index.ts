import $env from '@cfg/config.js';
import { $logger } from '@helpers/logger.js';
import { serve } from '@hono/node-server';
import errorHandler from '@middlewares/error.js';
import loggerMiddleware from '@middlewares/logger.js';
import extractMiddleware from '@middlewares/user.js';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import notFound from './not-found.js';
import users from './users.js';
import tokens from './tokens.js';

const port = Number($env('API_PORT'));
const url = $env('API_URL');

export const startHono = async () => {
  const app = new Hono();

  app
    // loggers and middlewares
    .use('*', loggerMiddleware, extractMiddleware)
    .use('*', cors())
    .onError(errorHandler)
    .basePath('/api')

    // end points
    .route('/users', users)
    .route('/tokens', tokens)

    // catching all remaining routes
    .route('*', notFound);

  app.onError(errorHandler);

  $logger.info(`started Hono server on url : ${url}`);

  serve({
    fetch: app.fetch,
    port,
  });

  app.routes.forEach(route => {
    // print them on the same line

    const method = route.method.padEnd(15, ' ');

    $logger.info(`${method} ${route.path}`);
  });
};
