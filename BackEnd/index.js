const app = require('express')()
const http = require('http')
const cors = require('cors')
const config = require('./config/config').config
const auth = require('./middleware/auth')
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
app.use('/login', require('./routes/session'))
app.use('/logout', require('./routes/session'))
app.use('/users', require('./routes/users'))
app.use('/patients',auth.checkToken, require('./routes/patients'))
app.use('/professionals',auth.checkToken, require('./routes/professionals'))


//Servers listeners
http.createServer(app)
.listen(config.PORT, ()=> console.log(`DataSurf HTTP Server running on port ${config.PORT}`))
