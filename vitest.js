const defaultCoverage = {
  provider: 'v8',
  all: true,
  exclude: [
    '**/*.d.ts',
    '**/*.test.{ts,tsx}',
    '**/*.spec.{ts,tsx}',
    '**/*.stories.{ts,tsx}',
    '**/index.{ts,tsx}',
    '**/main.{ts,tsx}',
  ],
  reporter: ['text', 'json-summary', 'lcov'],
  reportsDirectory: './coverage',
  thresholds: {
    statements: 80,
    branches: 75,
    functions: 80,
    lines: 80,
  },
}

/**
 * Strict, fast Vitest defaults. Enable reporting with `vitest run --coverage`.
 * Applications should scope `coverage.include` to executable business code.
 */
export function createVitestConfig({
  environment = 'node',
  include = ['src/**/*.test.{ts,tsx}'],
  setupFiles = [],
  coverage = {},
} = {}) {
  return {
    environment,
    include,
    setupFiles,
    passWithNoTests: false,
    testTimeout: 10_000,
    hookTimeout: 10_000,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    coverage: {
      ...defaultCoverage,
      ...coverage,
      thresholds: {
        ...defaultCoverage.thresholds,
        ...coverage.thresholds,
      },
    },
  }
}
