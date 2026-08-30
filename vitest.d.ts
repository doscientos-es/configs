import type { UserConfig } from 'vitest/config'

export type VitestConfigOptions = {
  environment?: 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime'
  include?: string[]
  setupFiles?: string[]
  coverage?: Record<string, unknown>
}

export declare function createVitestConfig(
  options?: VitestConfigOptions,
): NonNullable<UserConfig['test']>
