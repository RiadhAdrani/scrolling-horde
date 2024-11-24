import { MiddlewareHandler } from 'hono';

export type MiddlewareHandlerFunction<D extends Record<string, unknown>> = MiddlewareHandler<{
  Bindings: undefined;
  Variables: D;
}>;
