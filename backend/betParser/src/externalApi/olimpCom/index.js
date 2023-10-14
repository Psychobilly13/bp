require('dotenv').config()

const url = process.env.OLIMP_COM_URL

async function startOlimpCom () {
  const response = await fetch(url, {
    headers: {
      'Accept-Language': 'ru-RU'
    }
  })
  const html = await response.text()
  return html
}

module.exports = { startOlimpCom }
