var UserSchema = require('../models/Users')
const jwt = require('jsonwebtoken')
const app = require('express')()
const config = require('../config/config').config

app.set('JWTKey', config.JWTKey);
var controller = {}

controller.login = async (req, res) => {
  await UserSchema.find({ username: req.body.username, password: req.body.password })
  .exec((err, data) => {
    if (err) return res.status(500).json(err)
    if (!data) return res.status(404).json( { message: 'User or password incorrect' } )
    const payload = {
      check: true
    };
    const token = jwt.sign(payload, app.get('JWTKey'), {
      expiresIn: config.ACCESS_TOKEN_TIME
    });
    res.json({
      message: 'Autenticación correcta',
      token: token
    });
    return res.send(data)
  })
}

module.exports = controller