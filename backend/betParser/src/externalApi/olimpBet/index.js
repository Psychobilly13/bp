require('dotenv').config()

const url = process.env.OLIMP_BET_URL

async function startOlimpBet() {
    const response = await fetch(url, {headers: {
        'Accept-Language': 'ru-RU'
    }});
    const body = await response.json();
    const res = body.find(e => e.payload.id === '1')
    return res.payload.competitionsWithEvents;
}

module.exports = {startOlimpBet}