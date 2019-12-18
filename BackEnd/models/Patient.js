'use strict'
const mongoose = require('mongoose').plugin(require('../plugins/PluginSchema'))
const schema = mongoose.Schema

var _schema = new schema({
    firstSurname: String,
    secondSurname: String,
    professional:[{type: schema.Types.ObjectId, ref: 'professionals'}] ,
    name: String,
    birthdate: Date,
    identificationNumber: Number,
    nationality: String,
    streetAddress: String,
    department: String,
    neiborhood: String,
    city: String,
    state: String,
    zipCode: Number,
    mobileNumber: Number,
    phoneNumber: Number,
    emailAddress: String,
    active: Boolean,
    deleted: Boolean
  },{
  collection: 'patient'
})

// _schema.pre('save', function(next) {
//   if (!this.created){
//     this.deleted = false
//     this.active= true
//   };
//   next();
// });

module.exports = mongoose.model('patient', _schema)