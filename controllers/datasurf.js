var Schema = require('../models/Patient')
var mongoose = require('mongoose')

var controller = {}

controller.list = (req, res) => {
  Schema.find({})
//    .limit((req.query.limit) ? parseInt(req.query.limit) : 5)
  .exec((err, data) => {
    if (err) return res.status(500).json(err)
    if (!data) return res.status(404).json( { msg: 'Not found' } )
    return res.send(data)
  })
  }

  controller.read = (req, res) => {
    var id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Some parameters are not valid' })
    
    Schema.findOne({ _id: id }, (err, data) => {
      if (err) return res.status(500).json(err)
      if (!data) return res.status(404).json({ msg: "Not found" })
  
      return res.status(200).json(data)    
    })
  }

  controller.create = (req, res) => {
    Schema.create(req.body, (err, data)=>{
      if(err) return res.status(500).json(err)
      console.log(data)
      return res.status(201).json(data)
    })
  }

  controller.delete = (req, res) => {
    var id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json( { msg: 'Some parameters are not valid' } )
  
    Schema.deleteOne({ _id: id }, (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.n === 0) return res.status(404).json( { msg: 'Not found' } )      
      if (data.n > 0) return res.status(200).json( {msg: 'Record deleted'} )   
    })
  }

  controller.update = (req, res) => {
    var id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Some parameters are not valid' })
  
    Schema.findOneAndUpdate({ _id: id }, {$set: req.body}, {new:true}, (err, data) => {
      if (err) return res.status(500).json(err)
      if (!data) return res.status(404).json({ msg: "Not found" })
  
      return res.send(data)
    })
  }
  
  //correguir rango de fechas
  controller.searchByTimestampsRange = (req, res) => {
    var action
    var from = req.params.from
    var to = req.params.to
    var query = {}
  
    if (!req.query.action && req.query.action != 'createdAt' && req.query.action != 'updatedAt' || action == undefined) action = 'createdAt'
    if (!from && !to) return res.status(400).json({msg: 'Some parameters are missing'})
    if (from && to) query[action] =  {$gte : (from).replace(/[.]/g,'-'),$lte : (to).replace(/[.]/g,'-')}
    if (from) query[action] =  {$gte : (from).replace(/[.]/g,'-')}
    if (to) query[action] =  {$lte : (to).replace(/[.]/g,'-')}
  
    Schema.find(query)
    .select()
    .exec(function (err, result) {
      if (err) return res.status(500).json(err)
  
      return res.send(result)
    })
  }
module.exports = controller