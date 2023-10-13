const WebSocket = require('ws')
const GameService = require('./services/game.service')
const { createRangeArray } = require('./utils/array')
require('dotenv').config()

const port = process.env.WS_PORT || 8081
const host = process.env.WS_HOST || 'localhost'

const wss = new WebSocket.Server({ host, port })

wss.on('connection', (ws) => {
  console.log('client.connected')

  /** inject services */
  ws.gameService = new GameService()

  /** routes */
  ws.on('message', async (message) => {
    const req = JSON.parse(message)
    let result = 'invalidData'
    if (req.type === 'number') {
      const number = parseInt(req.data)
      if (typeof number === 'number' && !isNaN(number)) {
        result = await ws.gameService.startMarkoPolo(number)
      }
    } else if (req.type === 'list') {
      if (Array.isArray(req.data) && req.data.some(item => typeof item === 'number')) {
        result = await Promise.all(req.data.map(number => ws.gameService.startMarkoPolo(number)))
      }
    } else if (req.type === 'range') {
      if (Array.isArray(req.data) && req.data.some(item => typeof item === 'number') && req.data.length === 2) {
        const [start, end] = req.data
        const numbers = await createRangeArray(start, end)
        result = await Promise.all(numbers.map(number => ws.gameService.startMarkoPolo(number)))
      }
    }

    console.log(result);

    /** result */
    ws.send('client.response: ' + JSON.stringify(result))
  })
  ws.on('close', () => {
    console.log('client.disconnected')
  })
})

console.log(`[+] ws.app.server.linstening: ${host}:${port}`)
