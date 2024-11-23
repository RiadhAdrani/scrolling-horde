import type { EnvConfig } from '@shared-types/config';

const $env = <K extends keyof EnvConfig>(key: K): EnvConfig[K] => {
  const value = process.env[key];

  if (typeof value !== 'string') {
    throw new Error(`❌ Env variable "${key}" is not found `);
  }

  return value as EnvConfig[K];
};

export default $env;
