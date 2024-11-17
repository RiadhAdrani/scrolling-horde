import { startPrisma } from '@db/prisma.js';
import { $logger } from '@helpers/logger.js';
import $minio from '@helpers/storage.js';
import { startHono } from '@routes/index.js';
import seed from '../seed/index.js';

export const startServer = async () => {
  try {
    await $minio.init();
    await startPrisma();
    await startHono();
    await seed();
  } catch (e) {
    $logger.error(e, 'server stopped');
  }
};
