const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
const port = process.env.HTTP_PORT || 3000
const host = process.env.HTTP_HOST || 'localhost'

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, host, () => {
  console.log(`[+] client.running: ${host}:${port}`)
})
