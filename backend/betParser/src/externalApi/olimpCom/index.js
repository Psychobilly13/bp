require('dotenv').config()

const url = process.env.OLIMP_COM_URL

async function startOlimpCom () {
  try {
  const response = await fetch(url, {
    headers: {
      'Accept-Language': 'ru-RU'
    }
  })
  const html = await response.text()
  return html } catch (err) {
    throw new Error(`${err}`)
  }
}

module.exports = { startOlimpCom }
