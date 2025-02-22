import mongoose from 'mongoose'
require('dotenv').config()

//require chalk module to give colors to console text
import chalk from 'chalk'

const dbURL = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster.im1vk.mongodb.net/${process.env.NAME_DB}`
const connected = chalk.bold.cyan
const error = chalk.bold.yellow
const disconnected = chalk.bold.red
const termination = chalk.bold.magenta

export const connectMongoDB = () => {
  mongoose
    .connect(dbURL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection error:', error))
}

mongoose.connection.on('connected', function () {
  console.log(connected('Mongoose default connection is open to MongoDB Atlas'))
})

mongoose.connection.on('error', function (err) {
  console.log(
    error('Mongoose default connection has occured ' + err + ' error')
  )
})

mongoose.connection.on('disconnected', function () {
  console.log(disconnected('Mongoose default connection is disconnected'))
})
process.on('SIGINT', function () {
  mongoose.connection.close().then(() => {
    console.log(
      termination(
        'Mongoose default connection is disconnected due to application termination'
      )
    )
    process.exit(0)
  })
})

export const isValidId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
}
