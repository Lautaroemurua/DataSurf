'use strict'
const mongoose = require('mongoose').plugin(require('../plugins/PluginSchema'))
const schema = mongoose.Schema

var _schema = new schema({
    name: String,
    identificationNumber: Number,
    deleted: Boolean,
    active: Boolean
  },{
  collection: 'professionals'
})

// _schema.pre('save', function(next) {
//   if (!this.created){
//     this.deleted = false
//     this.active= true
//   };
//   next();
// });

module.exports = mongoose.model('professionals', _schema)