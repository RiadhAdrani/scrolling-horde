import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import UnoCSS from 'unocss/vite';

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    UnoCSS(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      appDirectory: 'app',
    }),
    tsconfigPaths(),
  ],
  define: {
    // ! for some reason we need to wrap this in single quotes
    // ! I think it's because we load env using "dotenv-cli"
    'import.meta.env.API_URL': `'${process.env.API_URL}'`,
    'import.meta.env.WEBAPP_URL': `'${process.env.WEBAPP_URL}'`,
    'import.meta.env.API_PORT': `'${process.env.API_PORT}'`,
    'import.meta.env.PROJECT': `'${process.env.PROJECT}'`,
  },
  server: {
    port: Number(process.env.WEBAPP_PORT) ?? 3000,
  },
});
