#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * @typedef {'dev' | 'prod'} DeployEnv
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Mapa de archivos de entorno por variante.
 *
 * @type {Record<DeployEnv, string>}
 */
const envFiles = {
  dev: '.env.dev',
  prod: '.env.prod',
}

/**
 * Devuelve la ayuda del comando.
 *
 * @returns {string}
 */
function helpText() {
  return [
    'Uso:',
    '  node manage-compose.mjs <dev|prod> <compose-args...>',
    '',
    'Ejemplos:',
    '  node manage-compose.mjs dev up -d --build',
    '  node manage-compose.mjs prod up -d --build',
    '  node manage-compose.mjs dev ps',
    '  node manage-compose.mjs prod config',
  ].join('\n')
}

/**
 * Valida y normaliza los argumentos CLI.
 *
 * @param {string[]} argv Argumentos recibidos desde process.argv.
 * @returns {{ deployEnv: DeployEnv, composeArgs: string[] }}
 */
function parseArgs(argv) {
  const [, , deployEnvRaw, ...composeArgs] = argv

  if (!deployEnvRaw || (deployEnvRaw !== 'dev' && deployEnvRaw !== 'prod')) {
    throw new Error(`Ambiente no valido: "${deployEnvRaw || ''}"`)
  }

  if (composeArgs.length === 0) {
    throw new Error('Debes indicar argumentos de docker compose. Ejemplo: up -d')
  }

  return {
    deployEnv: deployEnvRaw,
    composeArgs,
  }
}

/**
 * Ejecuta docker compose con el archivo de entorno seleccionado.
 *
 * @param {DeployEnv} deployEnv Ambiente objetivo.
 * @param {string[]} composeArgs Argumentos que se pasan a docker compose.
 * @returns {number} Codigo de salida del proceso.
 */
function runCompose(deployEnv, composeArgs) {
  const envFile = path.join(__dirname, envFiles[deployEnv])
  const composeFile = path.join(__dirname, 'docker-compose.yml')

  const args = ['compose', '-f', composeFile, '--env-file', envFile, ...composeArgs]

  console.log(`[compose] entorno: ${deployEnv}`)
  console.log(`[compose] env-file: ${envFile}`)
  console.log(`[compose] comando: docker ${args.join(' ')}`)

  const result = spawnSync('docker', args, {
    cwd: __dirname,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  return result.status ?? 1
}

try {
  const { deployEnv, composeArgs } = parseArgs(process.argv)
  const exitCode = runCompose(deployEnv, composeArgs)
  process.exit(exitCode)
} catch (error) {
  console.error(String(error?.message || error))
  console.error('')
  console.error(helpText())
  process.exit(1)
}
