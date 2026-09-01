#!/usr/bin/env node

import { existsSync, readdirSync, statSync } from 'node:fs'
import { relative, resolve, sep } from 'node:path'

const args = process.argv.slice(2)
const rootFlag = args.indexOf('--root')
const root = resolve(process.cwd(), rootFlag === -1 ? 'src' : (args[rootFlag + 1] ?? 'src'))
const usesTanstackRouter = args.includes('--tanstack-router')
const ignoredDirectories = new Set([
  '.git',
  '.next',
  '.turbo',
  'assets',
  'coverage',
  'dist',
  'docs',
  'node_modules',
])
const defaultTopLevel = new Set([
  'app',
  'features',
  'pages',
  'shared',
  ...(usesTanstackRouter ? ['routes'] : []),
])
const conventionalFiles = new Set([
  'App.css',
  'App.tsx',
  'main.tsx',
  'vite-env.d.ts',
  ...(usesTanstackRouter ? ['routeTree.gen.ts'] : []),
])
const failures = []

if (!existsSync(root)) {
  console.error(`Structure check: source root does not exist: ${root}`)
  process.exit(1)
}

function isKebabCase(name) {
  return /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)
}

function isConventionalFile(name) {
  if (conventionalFiles.has(name)) return true
  return (
    /^(?:[a-z][a-z0-9]*(?:-[a-z0-9]+)*)\.(?:test|spec|stories)\.(?:[cm]?[jt]sx?)$/.test(name) ||
    /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*\.(?:[cm]?[jt]sx?|css|json)$/.test(name)
  )
}

function inspect(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignoredDirectories.has(entry)) continue
    const absolute = resolve(directory, entry)
    const displayPath = relative(process.cwd(), absolute).split(sep).join('/')
    const stats = statSync(absolute)

    if (stats.isDirectory()) {
      if (!isKebabCase(entry)) failures.push(`${displayPath}: directory names must use kebab-case`)
      inspect(absolute)
      continue
    }

    const isTanstackRoute = usesTanstackRouter && relative(root, directory).split(sep)[0] === 'routes'
    if (!isTanstackRoute && !isConventionalFile(entry)) {
      failures.push(`${displayPath}: file names must use kebab-case and standard suffixes`)
    }
  }
}

for (const entry of readdirSync(root)) {
  const absolute = resolve(root, entry)
  if (statSync(absolute).isDirectory() && !defaultTopLevel.has(entry)) {
    failures.push(
      `src/${entry}: use one of ${[...defaultTopLevel].join(', ')} or configure the checker`,
    )
  }
}
inspect(root)

if (failures.length > 0) {
  console.error(`Structure check failed with ${failures.length} violation(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Structure check passed: ${relative(process.cwd(), root) || '.'}`)
