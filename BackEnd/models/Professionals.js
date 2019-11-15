const mongoose = require('mongoose')
const schema = mongoose.Schema

var _schema = new schema({
    name: String,
    identificationNumber: Number,
    deleted: Boolean,
    active: Boolean
  },{
  timestamps: true,
  collection: 'professionals'
})

_schema.pre('save', function(next) {
  if (!this.created){
    this.deleted = false
    this.active= true
  };
  next();
});

module.exports = mongoose.model('professionals', _schema)