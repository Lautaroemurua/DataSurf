var Schema = require('../models/Users')
const jwt = require('jsonwebtoken')
const app = require('express')()
const config = require('../config/config').config

async function login(req, res, next) {
  try {
    const user = req.body.user;
    const password = req.body.password;
    if (!user || !password) throw new Error('ReqFieldsNotSended');
    let token = await validateCredentials(user, password,res);
    // if(token){
    //   //return res.status(200).json({ token: token });
    // }else if(!token) {
    //   return res.status(404).json({ msg: 'No existe el token' });
    // }
    return token;
  } catch (err) {
    next(err);
  }
}

async function validateCredentials(user, password,res) {
  try {
    await Schema.findOne({ user: user, password: password }, (err, data) => {
      if (err) return res.status(500).json(err)
      if (!data) return res.status(404).json({ msg: "User or password incorrect" })
      if (data){
        app.set('JWTKey', config.JWTKey);
        const payload = {
          check: true
        };
        const token = jwt.sign(payload, app.get('JWTKey'), {
          expiresIn: config.ACCESS_TOKEN_TIME
        });
        res.json({
          message: 'Authentication successful',
          token: token
        });
      } 
    })
  } catch (error) {
    return error
  }
}

let checkToken = ((req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    jwt.verify(token, app.get('JWTKey'), (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Invalid Token' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.send({ 
        mensaje: 'Token not found.'
    });
  }
});

// async function logout(req, res, next) {
//   try {
//     req.session.loggedIn=false;
//     res.redirect('/');
//   } catch (err) {
//     next(err);
//   }
// }

module.exports = {
  login,
  checkToken,
//  logout
}
