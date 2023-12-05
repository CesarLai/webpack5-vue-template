const path = require('path')
const { rimrafSync } = require('rimraf')
const webpack = require('webpack')
const { PROJECT_ROOT } = require('../constants')
const webpackConfig = require('../config/webpack.prod')

async function actionBuild() {
  const distPath = path.resolve(PROJECT_ROOT, 'dist')
  rimrafSync(distPath)

  webpack(webpackConfig).run((err, result) => {
    if (err) console.error(err)
    if (result) console.info(result)
  })
}

module.exports = actionBuild
