import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'coverage', 'node_modules'] },

  // Base rules for every JavaScript/JSX file in the project.
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // Uppercase identifiers are components used in JSX, which core
      // no-unused-vars cannot see; ignore them to avoid false positives.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // React-specific rules only apply to application source.
  {
    files: ['src/**/*.{js,jsx}'],
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Mark identifiers referenced in JSX (e.g. Framer Motion's `motion`)
      // as used so core no-unused-vars does not flag them.
      'react/jsx-uses-vars': 'error',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Test files run under Node with the jsdom environment.
  {
    files: ['src/tests/**/*.{js,jsx}', '**/*.test.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // Config files execute in Node.
  {
    files: ['**/*.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
