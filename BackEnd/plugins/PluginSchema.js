module.exports = function (schema, options) {
  schema.add({deleted: {type: Boolean,
  default: false
  }})
  
  schema.set('timestamps', true)
  schema.static('logicalDeleteById',
  function (id) {
    return this.findOneAndUpdate({_id: id}),
    {'deleted': true}, {new: true}
  })

  schema.pre('logicalDeleteById',
  function (next) {
    console.log('pre function logicalDeleteById, put your logic here')
    next()
  })
}