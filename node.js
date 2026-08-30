import { typescriptConfig } from './typescript.js'

/** Node, scripts and server-side configuration profile. */
export const nodeConfig = {
  extends: [typescriptConfig],
  env: {
    node: true,
  },
  rules: {
    'no-console': 'off'
  },
}
