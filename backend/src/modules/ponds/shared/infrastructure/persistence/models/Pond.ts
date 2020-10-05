// @ts-ignore
const mongoose = require('mongoose')
// @ts-ignore
const Schema = mongoose.Schema
const PondSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  farmID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
})
const Pond = mongoose.model('ponds', PondSchema)
module.exports = Pond
