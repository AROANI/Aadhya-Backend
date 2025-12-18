module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prefer-arrow',
    'jsdoc',
    'unicorn',
    'prettier',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.js'],
  rules: {
    // Prettier formatting
    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    // TypeScript tweaks
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-empty-function': 'error',

    // Code clarity & structure
    'prefer-arrow/prefer-arrow-functions': 'off',
    'unicorn/prefer-ternary': 'error',
    'import/no-deprecated': 'error',
    'import/no-unassigned-import': 'warn',

    // General best practices
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    eqeqeq: ['warn', 'always'],
    'no-var': 'error',
    'no-duplicate-imports': 'error',
  },
};
