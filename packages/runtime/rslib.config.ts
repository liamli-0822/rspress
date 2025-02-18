import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

const CJS_COMMON_EXTERNALS = ['virtual-routes-ssr', 'virtual-routes'];

const COMMON_EXTERNALS = [
  '@theme',
  'virtual-search-index-hash',
  'virtual-site-data',
  'virtual-global-styles',
  'virtual-global-components',
  'virtual-search-hooks',
  'virtual-i18n-text',
  'virtual-prism-languages',
];

export default defineConfig({
  lib: [
    {
      bundle: false,
      source: {
        entry: { index: 'src/**' },
      },
      dts: true,
      format: 'esm',
      syntax: 'es2020',
      output: {
        externals: [
          ...COMMON_EXTERNALS,
          Object.fromEntries(
            CJS_COMMON_EXTERNALS.map(external => [
              external,
              `commonjs ${external}`,
            ]),
          ),
        ],
        filename: {
          js: '[name].js',
        },
      },
    },
  ],
  plugins: [pluginReact()],
});
