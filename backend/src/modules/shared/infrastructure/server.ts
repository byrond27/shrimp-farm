const express = require('express')
const mongoose = require('mongoose')
const index = require('../../../app/http/routes/api/index')

const app = express()

mongoose.set('useFindAndModify', false)
mongoose
  .connect(
    'mongodb://' +
      process.env.MONGO_HOSTNAME +
      ':' +
      process.env.MONGO_PORT +
      '/' +
      process.env.MONGO_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err: any) => console.log(err))

app.use('/', index)

module.exports = app
