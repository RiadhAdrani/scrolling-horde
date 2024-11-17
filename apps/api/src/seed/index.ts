import $env from '@cfg/config.js';
import { $logger } from '@helpers/logger.js';

export default async function seed() {
  if ($env('RUN_ENV') === 'prod') return;

  $logger.info('⏳ seeding now ...');

  $logger.info('✅ seeding completed');
}
