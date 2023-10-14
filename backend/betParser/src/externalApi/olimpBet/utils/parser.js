function betParser (html) {
  const res = html.find(e => e.payload.id === '1')
  const result = {}
  result.title = 'Футбол'
  result.events = []
  for (const competition of res.payload.competitionsWithEvents) {
    for (const event of competition.events) {
      const id = event?.id
      const champ = competition.competition?.name
      const title = event?.name
      const score = event?.score
      const p1 = event?.outcomes?.find(e => e.shortName === 'П1')?.probability
      const x = event?.outcomes?.find(e => e.shortName === 'Х')?.probability
      const p2 = event?.outcomes?.find(e => e.shortName === 'П2')?.probability
      if (![champ, title, score, p1, id, x, p2].some(e => e === '' || e === undefined)) {
        result.events.push({
          id,
          champ,
          title,
          score,
          p1: parseFloat(p1),
          x: parseFloat(x),
          p2: parseFloat(p2)
        })
      }
    }
  }
  return result
}

module.exports = { betParser }
