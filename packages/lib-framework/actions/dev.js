const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack.dev')

const devServerConfig = {
  progress: true
}

async function actionDev() {
  const compiler = webpack(webpackConfig)
  new WebpackDevServer(undefined, compiler).start()
}

module.exports = actionDev
