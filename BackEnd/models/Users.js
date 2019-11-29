'use strict'
const mongoose = require('mongoose')
const schema = mongoose.Schema

var _schema = new schema({
    firstname: String,
    lastName: String,
    user: String,
    password: String,
    email: String,
    active: Boolean,
    deleted: Boolean
  },{
  timestamps: true,
  collection: 'users'
})

_schema.pre('save', function(next) {
  if (!this.created){
    this.deleted = false
    this.active= true
  };
  next();
});

module.exports = mongoose.model('users', _schema)