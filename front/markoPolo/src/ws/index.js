const { getClientSocket } = require('./ws.client')
const readline = require('readline')

const socket = getClientSocket()

/** create console */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function processCommand (command, socket) {
  if (command.includes('-')) {
    await sendWsReqByCommand(command, socket)
    await startConsole()
  } else if (command === 'close') {
    socket.close()
    rl.close()
  } else {
    console.log("commands: \n-n 'number' - play with one number\n-l 'Array<number>' - play with array of numbers\n-r 'Array<number>' - play with range of array of two numbers\nclose - to close connect")
    await startConsole()
  }
}

async function startConsole (socket) {
  rl.question('[+]\n', async (command) => {
    await processCommand(command, socket)
  })
}

/** send command to websocket */
async function sendWsReqByCommand (command) {
  if (!command.match(/-n|-l|-r/)) {
    console.log('command.unknown')
    console.log("commands: \n-n 'number' - play with one number\n-l 'Array<number>' - play with array of numbers\n-r 'Array<number>' - play with range of array of two numbers\nclose - to close connect")
  }
  if (command.includes('-n')) {
    const strData = command.split('-n')[1]?.trim()
    const number = parseInt(strData)
    const data = {
      type: 'number',
      data: number
    }
    const jsonStr = JSON.stringify(data)
    socket.send(jsonStr)
  } else if (command.includes('-l')) {
    const strData = command.split('-l')[1]?.trim()
    const numbers = strData?.split(',').map(Number)
    const data = {
      type: 'list',
      data: numbers
    }
    const jsonStr = JSON.stringify(data)
    socket.send(jsonStr)
  } else if (command.includes('-r')) {
    const strData = command.split('-r')[1]?.trim()
    const numbers = strData?.split(',').map(Number)
    const data = {
      type: 'range',
      data: numbers
    }
    const jsonStr = JSON.stringify(data)
    socket.send(jsonStr)
  }
}

startConsole()
