function validateNumberParam (req, res, next) {
  try {
    const number = parseInt(req.params.number)

    if (typeof number !== 'number' || isNaN(number)) {
      const err = new Error('param.shouldBeNumber')
      err.code = 400
      throw err
    }

    req.validatedNumber = number
    next()
  } catch (err) {
    res.status(err.code || 500).json({ error: `${err.message}` })
  }
}

function validateArrayOfNumberBody (req, res, next) {
  try {
    const numbers = req.body

    if (!Array.isArray(numbers) || numbers.some(item => typeof item !== 'number')) {
      const err = new Error('body.shouldBeArrayOfNumbers')
      err.code = 400
      throw err
    }

    req.validatedArrayOfNumber = numbers
    next()
  } catch (err) {
    res.status(err.code || 500).json({ error: `${err.message}` })
  }
}

function validateRange (req, res, next) {
  try {
    const range = req.body

    if (!Array.isArray(range) || range.some(item => typeof item !== 'number')) {
      const err = new Error('body.shouldBeArrayOfNumbers')
      err.code = 400
      throw err
    }
    if (range.length !== 2) {
      const err = new Error('body.shouldBeFromTwoNumbers')
      err.code = 400
      throw err
    }

    req.validatedRange = range
    next()
  } catch (err) {
    res.status(err.code || 500).json({ error: `${err.message}` })
  }
}

module.exports = { validateNumberParam, validateArrayOfNumberBody, validateRange }
