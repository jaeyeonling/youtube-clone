import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

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

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan("dev"))

app.get('/', homeHandler)
app.get('/profile', profileHandler)

app.listen(PORT, listenHandler)