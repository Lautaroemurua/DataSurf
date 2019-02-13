const mongoose = require('mongoose')
const schema = mongoose.Schema

var _schema = new schema({
    firstSurname: String,
    secondSurname: String,
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
    active: Boolean
  },{
  timestamps: true,
  collection: 'patient'
})

module.exports = mongoose.model('patient', _schema)