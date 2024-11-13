module.exports = {
  parser: '@typescript-eslint/parser',  // Use the TypeScript parser if you are using TypeScript
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript plugin
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Custom ESLint rules
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
