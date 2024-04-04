import { join } from 'node:path'
import * as process from 'node:process'

export function getProjectDirectory() {
  return join(process.cwd(), process.env.PROJECT_NAME)
}

export function getWorkingDirectory() {
  return process.cwd()
}

export function getProjectName() {
  return process.env.PROJECT_NAME
}

export function getProjectDescription() {
  return process.env.PROJECT_DESCRIPTION
}
