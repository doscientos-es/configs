const productionImportBans = [
  {
    group: ['**/mocks/**', '**/tests/**'],
    message: 'El código de producción no puede depender de mocks ni de tests.',
  },
]

function restrictedImports(paths, patterns = []) {
  return ['error', { paths, patterns: [...productionImportBans, ...patterns] }]
}

/**
 * Enforces app/features/shared boundaries for projects using the @ alias.
 * Feature internals use relative imports; cross-feature imports use public APIs.
 */
export function createFeatureLayersConfig({ restrictedPaths = [], bannedPatterns = [] } = {}) {
  const rule = (patterns) => restrictedImports(restrictedPaths, [...bannedPatterns, ...patterns])

  return {
    rules: {
      'no-restricted-imports': rule([
        {
          group: ['@/features/*/*'],
          message: 'Importa otra feature exclusivamente desde su API pública.',
        },
      ]),
    },
    overrides: [
      {
        files: ['src/shared/**'],
        rules: {
          'no-restricted-imports': rule([
            {
              group: ['@/app/**', '@/features/**', '../app/**', '../features/**'],
              message: 'shared no puede depender de app ni de features.',
            },
          ]),
        },
      },
      {
        files: ['src/app/**'],
        rules: {
          'no-restricted-imports': rule([
            {
              group: ['@/features/*/*'],
              message: 'app compone APIs públicas de features, no sus internals.',
            },
          ]),
        },
      },
      {
        files: ['src/features/**/ui/**'],
        rules: {
          'no-restricted-imports': rule([
            {
              group: ['@/app/**', '../infrastructure/**', '@/features/*/infrastructure/**'],
              message: 'ui sólo puede usar application, shared y APIs públicas de features.',
            },
          ]),
        },
      },
      {
        files: ['src/features/**/application/**'],
        rules: {
          'no-restricted-imports': rule([
            {
              group: ['@/app/**', '../ui/**', '@/features/*/ui/**'],
              message: 'application no puede depender de ui ni de app.',
            },
          ]),
        },
      },
      {
        files: ['src/features/**/infrastructure/**'],
        rules: {
          'no-restricted-imports': rule([
            {
              group: ['@/app/**', '../ui/**', '@/features/*/ui/**'],
              message: 'infrastructure no puede depender de ui ni de app.',
            },
          ]),
        },
      },
      {
        files: ['**/*.{test,spec}.{ts,tsx}', 'src/features/**/{mocks,tests}/**'],
        rules: {
          'no-restricted-imports': 'off',
        },
      },
    ],
  }
}
