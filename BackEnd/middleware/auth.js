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
    console.log('Tu Token', token);
    //let data = await authData.getUser(profile.collaboratorId);
    return res.status(200).json({ msg: 'okey' });
  } catch (err) {
    next(err);
  }
}

async function validateCredentials(user, password,res) {
  // return new Promise(async (resolve, reject) => {
  try {
    await Schema.findOne({ username: user, password: password }, (err, data) => {
      if (err) return res.status(500).json(err)
      if (!data) return res.status(404).json({ msg: "Not found" })
      if (data){
        app.set('JWTKey', config.JWTKey);
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
        return token
      } 
    })
    //let response = await req(options);
    //let decoded = access.decode(response.access_token);
    //resolve();
  } catch (error) {
    return error
    // if(error.error.error_description){
    //   error = error.error.error_description;
    //   if(error.includes('Invalid username or password')) error = 'InvalidCredentials';
    // }
    //     reject(error); 
    //   }
    // });
  }
}
module.exports = {
  login
}
