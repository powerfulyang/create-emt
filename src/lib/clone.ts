import * as fs from 'node:fs'
import { join } from 'node:path'
import chalk from 'chalk'
import { execa } from 'execa'
import { getProjectDirectory, getProjectName, getWorkingDirectory } from '@/utils'

export async function cloneRepo(
  options: {
    branch?: string
    repo: string
  },
) {
  const {
    branch = 'master',
    repo,
  } = options

  const workingDirectory = getWorkingDirectory()
  const dir = getProjectName()
  const gitHistoryDir = join(getProjectDirectory(), '.git')

  try {
    await execa('git', ['clone', '--branch', branch, repo, dir], {
      cwd: workingDirectory,
      stdio: 'inherit',
    })
  }
  catch (err: any) {
    if (err.exitCodeName === 'ENOENT') {
      throw new Error(`
    Git is not installed on your PATH. Please install Git and try again.

    For more information, visit: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
`)
    }
    else {
      throw new Error(`Git clone failed.`)
    }
  }
  try {
    const commitHash = await execa('git', ['rev-parse', 'HEAD'], { cwd: gitHistoryDir })
    console.log(`${chalk.dim(`Cloned at commit: ${commitHash.stdout}`)}`)
  }
  catch {
    throw new Error(`Git rev-parse failed.`)
  }

  // rm gitHistoryDir
  await fs.promises.rm(gitHistoryDir, {
    recursive: true,
    force: true,
  })
}
