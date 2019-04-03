import "@babel/polyfill"

import './db'
import './models/Video'
import './models/Comment'
import './models/User'

import dotenv from 'dotenv'

import app from './app'

dotenv.config()

const PORT = process.env.SERVER_PORT || 4000

app.listen(PORT, () => console.log(`Listening :${app.address().port}`))