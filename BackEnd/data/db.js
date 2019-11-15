const mongoose = require('mongoose')
const config = require('../config/config').config

//MongoDB Connection
mongoose.connect( config.DB.URI, { useNewUrlParser: true } )
mongoose.set('useCreateIndex', true)
const db = mongoose.connection
db.on( 'error', (err)=>{
  if(err) throw err
})
db.once( 'open', ()=>{
  console.log('## MongoDB connected! ##')
})
