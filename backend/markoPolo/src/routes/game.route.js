const { validateNumberParam, validateArrayOfNumberBody, validateRange } = require('../middlewares/validation')
const { createRangeArray } = require('../utils/array')

async function gameRoute (app) {
  app.get('/game/:number', validateNumberParam, async (req, res) => {
    try {
      const number = req.validatedNumber
      const result = await req.gameService.startMarkoPolo(number)
      res.json(result)
    } catch (err) {
      res.status(err.code || 500).json({ error: `${err.message}` })
    }
  })

  app.post('/game/list', validateArrayOfNumberBody, async (req, res) => {
    try {
      const numbers = req.validatedArrayOfNumber
      const results = await Promise.all(numbers.map(number => req.gameService.startMarkoPolo(number)))
      res.json(results)
    } catch (err) {
      res.status(err.code || 500).json({ error: `${err.message}` })
    }
  })

  app.post('/game/range', validateRange, async (req, res) => {
    try {
      const range = req.validatedRange

      const [start, end] = range

      const numbers = await createRangeArray(start, end)

      const results = await Promise.all(numbers.map(number => req.gameService.startMarkoPolo(number)))
      res.json(results)
    } catch (err) {
      res.status(err.code || 500).json({ error: `${err.message}` })
    }
  })
}

module.exports = gameRoute
