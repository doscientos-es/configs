import assert from 'node:assert/strict'
import test from 'node:test'

import { baseConfig } from '../base.js'
import { createFeatureLayersConfig } from '../feature-layers.js'
import { createVitestConfig } from '../vitest.js'

test('base policy keeps high-signal safety rules enabled', () => {
  assert.equal(baseConfig.rules['no-debugger'], 'error')
  assert.equal(baseConfig.rules['import/no-cycle'], 'error')
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
