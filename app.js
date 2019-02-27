import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import routes from './routes'

import globalRouter from './router/globalRouter'
import userRouter from './router/userRouter'
import videoRouter from './router/videoRouter'

import { localsMiddleware } from './middlewares'

const app = express()

app.set('view engine', 'pug')

app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use(localsMiddleware)

app.use('/uploads', express.static('uploads'))

app.use(routes.home, globalRouter)
app.use(routes.users, userRouter)
app.use(routes.videos, videoRouter)

export default app