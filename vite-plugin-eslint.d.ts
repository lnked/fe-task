declare module 'vite-plugin-eslint' {
  import type { Plugin } from 'vite';

  interface Options {
    cache?: boolean;
    include?: string | string[];
    exclude?: string | string[];
    formatter?: string;
    eslintPath?: string;
    lintOnStart?: boolean;
    emitWarning?: boolean;
    emitError?: boolean;
    failOnWarning?: boolean;
    failOnError?: boolean;
  }

  export default function eslint(options?: Options): Plugin;
}


