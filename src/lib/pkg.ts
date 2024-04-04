import ora from 'ora'
import npmPkg from '@npmcli/package-json'
import { getProjectDescription, getProjectDirectory, getProjectName } from '@/utils'

export async function updatePackageJSON() {
  const spinnerPackage = ora('Updating package.json').start()
  const name = getProjectName()
  const description = getProjectDescription()

  const pkg = await npmPkg.load(getProjectDirectory())

  pkg.update({ name, description })

  await pkg.save()

  spinnerPackage.succeed('Updated package.json')
}
