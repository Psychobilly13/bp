const GameService = require('../services/game.service')

const { program } = require('commander')
const { getRandomNumberInRange } = require('../utils/number')

program
  .command('markoPolo:randomInRangeFrom1to1000')
  .description('Play in Marko Polo with random in range from 1 to 1000')
  .action(async () => {
    const number = getRandomNumberInRange(1, 1000)
    const gameService = new GameService()
    const result = await gameService.startMarkoPolo(number)
    console.log("number:", number)
    console.log("result:", result)
  })

program.parse(process.argv)
