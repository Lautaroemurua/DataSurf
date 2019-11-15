const mongoose = require('mongoose')
const schema = mongoose.Schema

var _schema = new schema({
    name:String,
    deleted: Boolean
  },{
  timestamps: true,
  collection: 'Professionals'
})

module.exports = mongoose.model('Professionals', _schema)