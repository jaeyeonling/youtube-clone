import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import globalRouter from './router/globalRouter'
import userRouter from './router/userRouter'
import videoRouter from './router/videoRouter'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan("dev"))

app.use('/', globalRouter)
app.use('/users', userRouter)
app.use('/videos', videoRouter)

export default app