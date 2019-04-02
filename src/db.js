import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const user = process.env.MONGO_USERNAME || ''
const pass = process.env.MONGO_PASSWORD || ''
const host = process.env.MONGO_HOST || 'localhost'
const name = process.env.MONGO_DATABASE || ''
const replicaSet = process.env.MONGO_REPLICA_SET

const config = {
  user,
  pass,
  replicaSet,
  authSource: 'admin',
  
  ssl: true,
  useNewUrlParser: true,
  useFindAndModify: false,
}

mongoose.connect(
  `mongodb+srv://${host}/${name}`,
  config,
)

const db = mongoose.connection

const openHandler = () => console.log('Connected to MongoDB')
const errorHandler = err => console.error(`Error on MongoDB Connection: ${err}`)

db.once('open', openHandler)
db.on('error', errorHandler)