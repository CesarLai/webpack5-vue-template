const action = require('../actions/dev')

function commandDev(program) {
    program.command('dev')
    .description('使用开发模式启动项目')
    .action(action)
}

module.exports = commandDev