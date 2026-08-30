import type { OxlintConfig } from 'oxlint'

export type RestrictedPath = {
  name: string
  message: string
  allowTypeImports?: boolean
}

export type BannedPattern = {
  group: string[]
  message: string
}

export declare function createFeatureLayersConfig(options?: {
  restrictedPaths?: RestrictedPath[]
  bannedPatterns?: BannedPattern[]
}): OxlintConfig
