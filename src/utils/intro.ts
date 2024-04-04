import { existsSync } from 'node:fs'
import { normalize } from 'node:path'
import chalk from 'chalk'
import gradient from 'gradient-string'
import validateNpmPackageName from 'validate-npm-package-name'

export interface EMTStarterArgsOptions {
  readonly description?: string
  readonly projectName?: string
}
export function validateName(input: string): true | string {
  return !validateNpmPackageName(input).validForNewPackages
    ? 'Name should be in-kebab-case (for npm)'
    : existsSync(input)
      ? `The "${input}" path already exists in this directory.`
      : true
}

export function getIntro(columns: number | undefined): string {
  const ascii = `
  ______           _ _ _              _                __  __       _ _   _______             _     _ 
 |  ____|         (_) (_)            | |              |  \\/  |     (_|_) |__   __|           | |   (_)
 | |__   _ __ ___  _| |_  __ _ ______| |_ __ _ _ __   | \\  / | __ _ _ _     | | ___ _ __  ___| |__  _ 
 |  __| | '_ \` _ \\| | | |/ _\` |______| __/ _\` | '_ \\  | |\\/| |/ _\` | | |    | |/ _ \\ '_ \\/ __| '_ \\| |
 | |____| | | | | | | | | (_| |      | || (_| | | | | | |  | | (_| | | |    | |  __/ | | \\__ \\ | | | |
 |______|_| |_| |_|_|_|_|\\__,_|       \\__\\__,_|_| |_| |_|  |_|\\__,_| |_|    |_|\\___|_| |_|___/_| |_|_|
                                                                  _/ |                                
                                                                 |__/                                 
`

  const asciiSmaller = `
  ___       _ _ _          _               __  __       _ _   _____            _    _ 
 | __|_ __ (_) (_)__ _ ___| |_ __ _ _ _   |  \\/  |__ _ (_|_) |_   _|__ _ _  __| |_ (_)
 | _|| '  \\| | | / _\` |___|  _/ _\` | ' \\  | |\\/| / _\` || | |   | |/ -_) ' \\(_-< ' \\| |
 |___|_|_|_|_|_|_\\__,_|    \\__\\__,_|_||_| |_|  |_\\__,_|/ |_|   |_|\\___|_||_/__/_||_|_|
                                                     |__/                             
`

  return columns && columns >= 85
    ? chalk.bold(gradient.mind(ascii))
    : columns && columns >= 74
      ? chalk.bold(gradient.mind(asciiSmaller))
      : `\n${chalk.cyan.bold.underline('create-emt')}\n`
}

/**
 * On Windows, normalize returns "\\" as the path separator.
 * This method normalizes with POSIX.
 */
export function normalizePath(path: string): string {
  return normalize(path).replace(/\\/g, '/')
}
