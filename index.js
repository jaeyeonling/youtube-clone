import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

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

app.use(morgan("dev"))
app.use(helmet())

app.get('/', homeHandler)
app.get('/profile', profileHandler)

app.listen(PORT, listenHandler)