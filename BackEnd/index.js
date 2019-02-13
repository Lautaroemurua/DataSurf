var express = require('express')
const app = require('express')()
const mongoose = require('mongoose')
const config = require('./constants').config
const http = require('http')

/*,
 mysql = require('mysql'),
 connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0woslWJ5PDCkARfO'
}); 

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();
*/

//BodyParser configuration
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '10mb',
  extended: true
}))

app.get('/', (req, res) => {
  res.send('<h1>API Server running</h1><hr/><a href="/API">Documentation</a>')
})
app.use('/patients', require('./routes/datasurf'))

//app.use('/autodata', require('./routes/datasurf'))

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

//Servers listeners
http.createServer(app)
.listen(3002, ()=> console.log(`DataSurf HTTP Server running on port ${3002}`))
