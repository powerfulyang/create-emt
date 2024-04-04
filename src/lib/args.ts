import meow from 'meow'

import type { EMTStarterArgsOptions } from '@/utils/intro'

export async function checkArgs(): Promise<EMTStarterArgsOptions> {
  const cli = meow(
        `
	Usage
	  $ npm create emt

  Non-Interactive Usage
    $ npm create emt <project-name> [options]

	Options
    --description, -d   package.json description
    --no-editorconfig   don't include .editorconfig

    Non-Interactive Example
	  $ npm create emt my-library -d 'do something, better'
    `,
        {
          importMeta: import.meta,
          flags: {
            description: {
              shortFlag: 'd',
              type: 'string',
            },
          },
        },
  )

  const projectName = cli.input[0]

  return {
    projectName,
    ...cli.flags,
  }
}
