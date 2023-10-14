function createDataForTable (eventCom, eventBet) {
  const table = {}
  if (eventCom.id === eventBet.id) {
    table['Название матча'] = `${eventCom.title}`
    table.id = eventCom.id
    table.score = eventCom.score

    // p1
    if (eventCom.p1 > eventBet.p1) {
      table['П1'] = `olimp.com ${eventCom.p1} > ${eventBet.p1} olimp.bet`
    } else if (eventCom.p1 < eventBet.p1) {
      table['П1'] = `olimp.com ${eventCom.p1} < ${eventBet.p1} olimp.bet`
    } else {
      table['П1'] = `olimp.com ${eventCom.p1} = ${eventBet.p1} olimp.bet`
    }

    // x
    if (eventCom.x > eventBet.x) {
      table.X = `olimp.com ${eventCom.x} > ${eventBet.x} olimp.bet`
    } else if (eventCom.x < eventBet.x) {
      table.X = `olimp.com ${eventCom.x} < ${eventBet.x} olimp.bet`
    } else {
      table.X = `olimp.com ${eventCom.x} = ${eventBet.x} olimp.bet`
    }

    // p2
    if (eventCom.p2 > eventBet.p2) {
      table['П2'] = `olimp.com ${eventCom.p2} > ${eventBet.p2} olimp.bet`
    } else if (eventCom.p2 < eventBet.p2) {
      table['П2'] = `olimp.com ${eventCom.p2} < ${eventBet.p2} olimp.bet`
    } else {
      table['П2'] = `olimp.com ${eventCom.p2} = ${eventBet.p2} olimp.bet`
    }

    return table
  }
}

module.exports = { createDataForTable }
