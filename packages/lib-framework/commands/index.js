const commandDev = require('./dev')
const commandBuild = require('./build')
const commandStart = require('./start')

const commands = [commandDev, commandBuild, commandStart]

function loadCommands(program) {
  return commands.reduce((prog, cmd) => {
    cmd(prog)
    return prog
  }, program)
}

module.exports = loadCommands
