const WebSocket = require('ws')
require('dotenv').config()

function getClientSocket () {
  const socket = new WebSocket(process.env.WS_URL)

  socket.addEventListener('message', (event) => {
    console.log('ws.messageFromServer:', event.data)
  })
  socket.addEventListener('open', (_event) => {
    console.log('ws.connected')
  })

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('connect.closing.clean')
    } else {
      console.log('connect.closing')
    }
    console.log('code:', event.code)
  })

  socket.addEventListener('error', (event) => {
    console.error('error:', event)
  })

  return socket
}

module.exports = { getClientSocket }
