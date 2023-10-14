const { startOlimpBet } = require("./externalApi/olimpBet");
const { startOlimpCom } = require("./externalApi/olimpCom");

async function getData() {
    const [olCom, olBet] = await Promise.all([startOlimpCom(), startOlimpBet()]);
    console.log(olBet);
}

getData();

// console.table(["apples", "oranges", "bananas"])