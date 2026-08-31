import assert from 'node:assert/strict'
import test from 'node:test'

import { astroConfig } from '../astro.js'
import { baseConfig } from '../base.js'
import { createFeatureLayersConfig } from '../feature-layers.js'
import { reactNextConfig } from '../react-next.js'
import { reactViteConfig } from '../react-vite.js'
import { reactConfig } from '../react.js'
import { typescriptConfig } from '../typescript.js'
import { createVitestConfig } from '../vitest.js'

test('base policy keeps high-signal safety rules enabled', () => {
  assert.equal(baseConfig.rules['no-debugger'], 'error')
  assert.equal(baseConfig.rules['import/no-cycle'], 'error')
  assert.equal(baseConfig.rules.eqeqeq[2].null, 'ignore')
  assert.ok(baseConfig.ignorePatterns.includes('node_modules/**'))
})

test('framework profiles compose their intended foundations', () => {
  assert.equal(reactConfig.extends[0], typescriptConfig)
  assert.equal(reactViteConfig.extends[0], reactConfig)
  assert.equal(reactNextConfig.extends[0], reactConfig)
  assert.equal(astroConfig.extends[0], typescriptConfig)
})

test('Vitest factory provides strict and overrideable coverage thresholds', () => {
  const config = createVitestConfig({ coverage: { thresholds: { branches: 85 } } })
  assert.equal(config.coverage.thresholds.lines, 80)
  assert.equal(config.coverage.thresholds.branches, 85)
  assert.equal(config.clearMocks, true)
})

test('feature profile protects feature internals', () => {
  const config = createFeatureLayersConfig()
  assert.equal(config.rules['no-restricted-imports'][0], 'error')
})
