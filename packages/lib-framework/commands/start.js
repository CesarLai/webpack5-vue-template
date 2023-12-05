const action = require('../actions/start')

function commandStart(program) {
  program.command('start').description('启动项目').action(action)
}

module.exports = commandStart
