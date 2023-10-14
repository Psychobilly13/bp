const cheerio = require('cheerio')

function comParser (html) {
  const result = {}
  const $ = cheerio.load(html)
  $('div.match_live-sport').each(function () {
    const sportTitle = $(this).find('div.sport-title').text().trim()
    const sportId = $(this).find('div > a.nopic-arrow').attr('data-sportid')
    if (sportId === '1') {
      if (!result[sportId]) result[sportId] = { title: sportTitle, events: [] }

      $(this).find('tbody > tr').each(function () {
        const link = $(this).find('td.col-title > a').attr('href')?.split('=')
        const id = link?.at(-1)
        const champ = $(this).find('td.col-title > a').text()
        const title = $(this).find('td.col-title > nobr').text()
        const score = $(this).find('td.col-title > div').text().match(/[0-9]:[0-9]/)?.[0]

        const p1 = $(this).find('td.col-koefs').find('td.col-p1').text().trim().split('-').map((r) => r.trim())[1]
        const x = $(this).find('td.col-koefs').find('td.col-x').text().trim().split('-').map((r) => r.trim())[1]
        const p2 = $(this).find('td.col-koefs').find('td.col-p2').text().trim().split('-').map((r) => r.trim())[1]

        if (![champ, id, title, score, p1, x, p2].some(e => e === '' || e === undefined)) {
          result[sportId].events.push({
            id,
            champ,
            title,
            score,
            p1: parseFloat(p1),
            x: parseFloat(x),
            p2: parseFloat(p2)
          })
        }
      })
    }
  })
  return result['1']
}

module.exports = { comParser }
