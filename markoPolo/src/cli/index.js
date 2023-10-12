const GameService = require("../services/game.service");

const { program } = require('commander');
const { getRandomNumberInRange } = require("./utils/number");

program
    .command('markoPolo:randomInRangeFrom1to100')
    .description('Play in Marko Polo with random in range from 1 to 100')
    .action(async () => {
        const number = getRandomNumberInRange(1, 100);
        const gameService = new GameService()
        const result = await gameService.startMarkoPolo(number);
        console.log(result);
    });

program.parse(process.argv);