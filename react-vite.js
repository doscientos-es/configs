import { typescriptConfig } from './typescript.js'

/** React browser profile for Vite applications. */
export const reactViteConfig = {
  extends: [typescriptConfig],
  env: {
    browser: true,
  },
  plugins: ['jsx-a11y', 'react'],
  rules: {
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/no-access-key': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/only-export-components': ['error', { allowConstantExport: true }],
    'react/rules-of-hooks': 'error',
  },
}
