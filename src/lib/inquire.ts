import process from 'node:process'
import type { DistinctQuestion } from 'inquirer'
import inquirer from 'inquirer'
import type { EMTStarterArgsOptions } from '@/utils/intro'
import { validateName } from '@/utils/intro'

const { prompt } = inquirer

export async function inquire(userOptions: EMTStarterArgsOptions) {
  const packageNameQuestion: DistinctQuestion = {
    filter: (answer: string) => answer.trim(),
    message: '📦 Enter the new package name:',
    name: 'projectName',
    type: 'input',
    validate: validateName,
  }

  const packageDescriptionQuestion: DistinctQuestion = {
    filter: (answer: string) => answer.trim(),
    message: '💬 Enter the package description:',
    name: 'description',
    type: 'input',
    default: 'A modern TypeScript library',
    validate: (answer: string) => answer.length > 0,
  }

  enum TypeDefinitions {
    none = 'none',
    node = 'node',
    dom = 'dom',
    nodeAndDom = 'both',
  }

  const definitions: DistinctQuestion = {
    choices: [
      {
        name: `None — the library won't use any globals or modules from Node.js or the DOM`,
        value: TypeDefinitions.none,
      },
      {
        name: `Node.js — parts of the library require access to Node.js globals or built-in modules`,
        value: TypeDefinitions.node,
      },
      {
        name: `DOM — parts of the library require access to the Document Object Model (DOM)`,
        value: TypeDefinitions.dom,
      },
      {
        name: `Both Node.js and DOM — some parts of the library require Node.js, other parts require DOM access`,
        value: TypeDefinitions.nodeAndDom,
      },
    ],
    message: '📚 Which global type definitions do you want to include?',
    name: 'definitions',
    type: 'list',
  }

  let { description, projectName } = userOptions

  const questions = []

  if (!projectName) {
    questions.push(packageNameQuestion)
  }

  if (!description) {
    questions.push(packageDescriptionQuestion)
  }

  const result = await prompt<{
    projectName: string
    description: string
    definitions: TypeDefinitions
  }>([
    ...questions,
    definitions,
  ])

  projectName ||= result.projectName
  description ||= result.description

  process.env.PROJECT_NAME = projectName
  process.env.PROJECT_DESCRIPTION = description
}
