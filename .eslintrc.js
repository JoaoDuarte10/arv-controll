module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  overrides: [{
    files: ['test/*.ts', 'test/**/*.ts'],
  }],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['.eslintrc.js', 'test/**/*.ts', 'build/**', 'dist/**', 'jest.config.ts'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
  },
};
