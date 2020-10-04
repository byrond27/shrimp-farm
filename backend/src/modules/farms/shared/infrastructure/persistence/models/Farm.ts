// @ts-ignore
const mongoose = require('mongoose')
// @ts-ignore
const Schema = mongoose.Schema
const FarmSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  farm_size: {
    type: Number,
    required: true,
  },
})
const Farm = mongoose.model('farms', FarmSchema)
module.exports = Farm
