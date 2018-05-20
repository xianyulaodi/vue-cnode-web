'use strict'
const chalk = require('chalk')  // 改变命令行中的字体颜色
const semver = require('semver') // 是用来对特定的版本号做判断的
const packageConfig = require('../package.json')
const shell = require('shelljs') // //用来执行Unix系统命令，调用系统命令更加方便

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: "node",
    currentVersion: semver.clean(process.version), // 提取进程版本信息转化成规定格式，也就是 '  =v1.2.3  ' -> '1.2.3' 这种功能
    versionRequirement: packageConfig.engines.node
  }
];

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    // 如果当前版本号不符合 package.json 要求的版本号，红色表示当前版本信息，绿色表示要求的版本信息，添加到 warnings 待输出
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
