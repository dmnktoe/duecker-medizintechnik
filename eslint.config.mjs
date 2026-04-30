import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'public/**',
    'next-env.d.ts',
    '*.config.js',
  ]),
  ...nextCoreWebVitals,
  ...nextTypescript,
  eslintConfigPrettier,
  prettierRecommended,
  {
    name: 'duecker/custom',
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    settings: {
      react: {
        // ESLint 10: eslint-plugin-react cannot auto-detect (context.getFilename); pin version.
        version: '19.2',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-console': 'warn',
      'no-multi-spaces': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      'object-curly-spacing': ['warn', 'always'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      'react/display-name': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern:
            '^_|ButtonVariant$|ButtonSize$|IconButtonVariant$|TextButtonVariant$|ButtonLinkVariant$|ButtonLinkSize$|IconLinkVariant$|PrimaryLinkVariant$',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/static-components': 'off',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^@?\\w', '^\\u0000'],
            ['^.+\\.s?css$'],
            ['^@/lib', '^@/hooks'],
            ['^@/data'],
            ['^@/components', '^@/container'],
            ['^@/store'],
            ['^@/'],
            [
              '^\\./?$',
              '^\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\./\\.\\.(?!/?$)',
            ],
            ['^@/types'],
            ['^'],
          ],
        },
      ],
    },
  },
]);
