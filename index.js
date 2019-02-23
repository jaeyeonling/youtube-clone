const express = require('express')

const app = express()

const PORT = 4000

const listenHandler = () => {
  console.log(`Listening on: http://localhost:${PORT}`)
}

app.listen(PORT, listenHandler)