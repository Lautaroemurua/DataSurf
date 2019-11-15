const app = require('express')()
const http = require('http')
const cors = require('cors')
const db = require('./data/db')
//BodyParser configuration
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '10mb',
  extended: true
}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>API Server running</h1><hr/><a href="/API">Documentation</a>')
})
app.use('/patients', require('./routes/patients'))
app.use('/professionals', require('./routes/professionals'))


//Servers listeners
http.createServer(app)
.listen(3002, ()=> console.log(`DataSurf HTTP Server running on port ${3002}`))
