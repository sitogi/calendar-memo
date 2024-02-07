module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['react', '@typescript-eslint', 'import-access'],
  rules: {
    'import-access/jsdoc': ['error'],
    'newline-before-return': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '{react,react-dom/**}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'off', // REVISIT: ~/App などのパスを解析させる方法がわからなかった
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        // Array.filter や onClick 内の void は省略しても OK とする
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
