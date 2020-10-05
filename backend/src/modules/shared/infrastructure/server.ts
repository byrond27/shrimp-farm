import express from 'express'
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('../../../app/http/routes/api/index')
const farms = require('../../../app/http/routes/api/farms')
const ponds = require('../../../app/http/routes/api/ponds')

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())

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
app.use('/api/farms', farms)
app.use('/api/ponds', ponds)

module.exports = app
