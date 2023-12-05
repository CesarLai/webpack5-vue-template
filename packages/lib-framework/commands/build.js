const action = require('../actions/build')

function commandBuild(program) {
    program.command('build')
    .description('构建当前子系统')
    .action(action)
}

module.exports = commandBuild