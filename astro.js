import { typescriptConfig } from './typescript.js'

/** Astro profile; framework compiler validation remains `astro check`. */
export const astroConfig = { extends: [typescriptConfig] }
