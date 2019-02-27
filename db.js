import mongoose from 'mongoose'

const host = ''
const port = 27017
const name = 'youtube-clone'

const config = {
  useNewUrlParser: true,
  useFindAndModify: false,
}

mongoose.connect(
  `mongodb://${host}:${port}/${name}`,
  config,
)

const db = mongoose.connection

const openHandler = () => console.log('Connected to MongoDB')
const errorHandler = err => console.error(`Error on MongoDB Connection: ${err}`)

db.once('oepn', openHandler)
db.on('error', errorHandler)