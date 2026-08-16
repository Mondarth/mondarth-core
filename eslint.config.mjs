import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(js.configs.recommended, ...ts.configs.recommended, ...svelte.configs.recommended, {
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.browser,
      ...globals.jquery,
    },
  },

  rules: {
    'no-shadow': [
      'error',
      {
        builtinGlobals: true,
        hoist: 'all',
        allow: ['document', 'event', 'name', 'parent', 'status', 'top'],
      },
    ],
  },
});
