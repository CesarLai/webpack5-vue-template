#!/usr/bin/env node

const commander = require('commander')
const loadCommands = require('../commands')

const bootstrap = async () => {
  const program = commander
  program
    .version(
      require('../package.json').version,
      '-v, --version',
      '输出当前脚手架版本'
    )
    .usage('<command> [options]')
    .helpOption('-h, --help', '输出帮助信息')

  loadCommands(program)
  await commander.parseAsync(process.argv)

  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }
}

bootstrap()
