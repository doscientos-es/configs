import { typescriptConfig } from './typescript.js'

/**
 * Opt-in profile for domain libraries with fully typed external boundaries.
 * Keep it separate from application code that deliberately validates unknown
 * payloads from APIs.
 */
export const typescriptStrictConfig = {
  extends: [typescriptConfig],
  rules: {
    'typescript/no-unsafe-argument': 'error',
    'typescript/no-unsafe-assignment': 'error',
    'typescript/no-unsafe-call': 'error',
    'typescript/no-unsafe-member-access': 'error',
    'typescript/no-unsafe-return': 'error',
  },
}
