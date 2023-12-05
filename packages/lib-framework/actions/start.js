const fs = require('fs')
const path = require('path')
const express = require('express')
const { DIST_PATH } = require('../constants')

async function actionStart() {
  if (!fs.existsSync(DIST_PATH)) console.error('dist 目录不存在')

  const app = express()
  app.use(express.static(DIST_PATH))

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(DIST_PATH, 'index.html'))
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
  })
}

module.exports = actionStart
