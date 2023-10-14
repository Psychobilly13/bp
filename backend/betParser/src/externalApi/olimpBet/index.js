require('dotenv').config()

const url = process.env.OLIMP_BET_URL

async function startOlimpBet () {
  const response = await fetch(url, {
    headers: {
      'Accept-Language': 'ru-RU'
    }
  })
  const html = await response.json()
  return html
}

module.exports = { startOlimpBet }
