import { baseConfig } from './base.js'

/**
 * TypeScript policy with high-confidence semantic rules.
 * Requires oxlint-tsgolint to be installed by the consuming project.
 */
export const typescriptConfig = {
  extends: [baseConfig],
  plugins: ['typescript'],
  options: {
    typeAware: true,
  },
  rules: {
    'typescript/await-thenable': 'error',
    'typescript/consistent-type-imports': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-unsafe-enum-comparison': 'error',
  },
}
