const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const config = require('../config/config').config

app.set('JWTKey', config.JWTKey);

let checkToken = ((req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    jwt.verify(token, app.get('JWTKey'), (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Token inválida' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.send({ 
        mensaje: 'Token no proveída.' 
    });
  }
});
module.export = checkToken