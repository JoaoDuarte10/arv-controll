module.exports = {
  'env': {
    'node': true,
    'es2021': true,
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'project': 'tsconfig.json',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  "ignorePatterns": ['.eslintrc.js'],
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],

  },
};
