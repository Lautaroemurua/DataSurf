var Schema = require('../models/Users')
var mongoose = require('mongoose')

var controller = {}

controller.create = async (req, res) => {
  await Schema.findOne({email:req.body.email},(err,data)=>{
    if (err) return res.status(500).json(err)
    if (data) return res.status(500).json({ msg: "Email already exist" })
    if (!data) {
      Schema.create(req.body, (err, data)=>{
        if(err) return res.status(500).json(err)
        console.log(data)
        return res.status(201).json(data)
      })
    }
  });
}



// controller.logicDelete = async (req, res) => {
//   var id = req.params.id
//   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Some parameters are not valid' })

//   await Schema.findOneAndUpdate({ _id: id }, {$set: {"deleted":true}}, {new:true}, (err, data) => {
//     if (err) return res.status(500).json(err)
//     if (!data) return res.status(404).json({ msg: "Not found" })
//     return res.send(data)
//   })
// }

// controller.update = async (req, res) => {
//   if (req.body) {
//     var id = req.params.id
//     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Some parameters are not valid' })
  
//     await Schema.findOneAndUpdate({ _id: id }, {$set: req.body}, {new:true}, (err, data) => {
//       if (err) return res.status(500).json(err)
//       if (!data) return res.status(404).json({ msg: "Not found" })
  
//       return res.send(data)
//     })
//   }
// }

module.exports = controller