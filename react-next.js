import { reactConfig } from './react.js'

/** React profile for Next applications. Next-specific guidance is non-blocking. */
export const reactNextConfig = {
  extends: [reactConfig],
  plugins: ['nextjs'],
  rules: { 'nextjs/no-img-element': 'warn' },
}
