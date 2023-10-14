const express = require('express')
const gameRoute = require('./routes/game.route')
const GameService = require('./services/game.service')
require('dotenv').config()

async function app () {
  /** init */
  const app = express()
  const port = process.env.HTTP_PORT || 3000
  const host = process.env.HTTP_HOST || 'localhost'

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  /** cors */
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
  })

  /** inject services */
  app.use((req, _res, next) => {
    req.gameService = new GameService()
    next()
  })

  /** routes */
  await gameRoute(app)

  app.listen(port, host, () => {
    console.log(`[+] http.app.server.listening: ${host}:${port}`)
  })
}

app()
