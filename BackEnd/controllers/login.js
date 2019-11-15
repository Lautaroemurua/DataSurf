var Schema = require('../models/patient')
var mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('express')()
const config = require('../config/config').config

app.set('JWTKey', config.JWTKey);
var controller = {}

controller.login = (req, res) => {
  // await Schema.find({ username: req.body.username, password: req.body.password })
  // .exec((err, data) => {
  //   if (err) return res.status(500).json(err)
  //   if (!data) return res.status(404).json( { msg: 'Not found' } )
  //   return res.send(data)
  // })

  if (req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
    const payload = {
      check: true
    };
    const token = jwt.sign(payload, app.get('JWTKey'), {
      expiresIn: 1440
    });
    res.json({
      message: 'Autenticación correcta',
      token: token
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" })
  }

}

module.exports = controller