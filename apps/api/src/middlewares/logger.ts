import { $logger } from '@helpers/logger.js';
import { logger as loggerMiddleware } from 'hono/logger';

export default loggerMiddleware((str, ...rest) => $logger.info(str, ...rest));
