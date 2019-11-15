var Schema = require('../models/patient')
var mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('express')()
const config = require('../config/config').config

app.set('JWTKey', config.JWTKey);
var controller = {}


controller.create = async (req, res) => {
  await Schema.create(req.body, (err, data)=>{
    if(err) return res.status(500).json(err)
    console.log(data)
    return res.status(201).json(data)
  })
}

controller.logicDelete = async (req, res) => {
  var id = req.params.id
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Some parameters are not valid' })

  await Schema.findOneAndUpdate({ _id: id }, {$set: {"deleted":true}}, {new:true}, (err, data) => {
    if (err) return res.status(500).json(err)
    if (!data) return res.status(404).json({ msg: "Not found" })
    return res.send(data)
  })
}

controller.update = async (req, res) => {
  if (req.body) {
    var id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Some parameters are not valid' })
  
    await Schema.findOneAndUpdate({ _id: id }, {$set: req.body}, {new:true}, (err, data) => {
      if (err) return res.status(500).json(err)
      if (!data) return res.status(404).json({ msg: "Not found" })
  
      return res.send(data)
    })
  }
}

module.exports = controller