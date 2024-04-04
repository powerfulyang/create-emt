#!/usr/bin/env node

import * as process from 'node:process'
import { updatePackageJSON } from '@/lib/pkg'
import { cloneRepo } from '@/lib/clone'
import { checkArgs } from '@/lib/args'
import { inquire } from '@/lib/inquire'
import { getIntro } from '@/utils/intro'

console.log(getIntro(process.stdout.columns))

const userOptions = await checkArgs()

await inquire(userOptions)

await cloneRepo({
  repo: 'https://github.com/powerfulyang/emt.git',
})

await updatePackageJSON()
