import { reactConfig } from './react.js'

/** React browser profile for Vite applications. */
export const reactViteConfig = {
  extends: [reactConfig],
  rules: {
    'react/only-export-components': ['error', { allowConstantExport: true }],
  },
}
