const path = require('path')

const PROJECT_ROOT = process.cwd()
const ENTRY_PATH = path.resolve(PROJECT_ROOT, 'src')
const DIST_PATH = path.resolve(PROJECT_ROOT, 'dist')
const CONTEXT_PATH = path.resolve(__dirname, '../')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  PROJECT_ROOT,
  ENTRY_PATH,
  DIST_PATH,
  CONTEXT_PATH,
  isProd
}
