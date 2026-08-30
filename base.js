/**
 * High-signal JavaScript policy. Framework-specific profiles extend this object.
 */
export const baseConfig = {
  plugins: ['import', 'oxc'],
  options: {
    reportUnusedDisableDirectives: 'error',
  },
  rules: {
    eqeqeq: ['error', 'always'],
    'import/no-cycle': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-throw-literal': 'error',
    'no-unsafe-finally': 'error',
    'no-useless-catch': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
  },
}
