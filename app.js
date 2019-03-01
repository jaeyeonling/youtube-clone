import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'

import './passport'

import routes from './routes'
import globalRouter from './routers/globalRouter'
import userRouter from './routers/userRouter'
import videoRouter from './routers/videoRouter'

import { localsMiddleware } from './middlewares'

const app = express()

app.set('view engine', 'pug')

app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(session({
  secret: process.env.COOKIE_SECRET || 'secret',
  resave: true,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(localsMiddleware)

app.use('/uploads', express.static('uploads'))
app.use('/static', express.static('static'))

app.use(routes.home, globalRouter)
app.use(routes.users, userRouter)
app.use(routes.videos, videoRouter)

export default app