const { startOlimpBet } = require('./externalApi/olimpBet')
const { startOlimpCom } = require('./externalApi/olimpCom')
const { comParser } = require('./externalApi/olimpCom/utils/parser')
const { betParser } = require('./externalApi/olimpBet/utils/parser')
const { createDataForTable } = require('./utils/table')

async function parse () {
  const [olCom, olBet] = await Promise.all([startOlimpCom(), startOlimpBet()])
  const parsedOlComData = comParser(olCom)
  const parsedOlBetData = betParser(olBet)

  const table = []
  for (const eventCom of parsedOlComData.events) {
    for (const eventBet of parsedOlBetData.events) {
      const data = createDataForTable(eventCom, eventBet)
      if (data) {
        table.push(data)
      }
    }
  }

  console.table(table)
}

parse()

module.exports = parse
