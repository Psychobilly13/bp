const cron = require('node-cron')
const parse = require('..')

// at every 15 sec
const parser = cron.schedule('*/15 * * * * *', async () => {
  await parse()
})

parser.start()
