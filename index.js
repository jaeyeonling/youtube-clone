import express from 'express'

const app = express()

const PORT = 4000

const listenHandler = () => {
  console.log(`Listening on: http://localhost:${PORT}`)
}

const homeHandler = (req, res) => {
  res.send('Hello from home')
}

const profileHandler = (req, res) => {
  res.send('Hello from profile')
}

const loggingMiddleware = (req, res, next) => {
  console.log("I'm middleware")
  next()
}

app.use(loggingMiddleware)

app.get('/', homeHandler)
app.get('/profile', profileHandler)

app.listen(PORT, listenHandler)