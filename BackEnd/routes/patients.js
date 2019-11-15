const express = require('express')
const router = express.Router()
const controller = require('../controllers/patients')
//const auth = require('../middleware/auth')
const app = express()
const config = require('../config/config').config
const jwt = require('jsonwebtoken')
app.set('JWTKey', config.JWTKey);
const auth = express.Router();
auth.use((req, res, next) => {
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

router.get('/',auth, controller.list)
router.get('/:id', controller.read)

router.post('/', controller.create)
router.put('/:id', controller.logicDelete)
router.put('/:id', controller.update)

router.get('/timestamps/:from(*)-:to(*)', controller.searchByTimestampsRange)
router.get('/timestamps/:from(*)', controller.searchByTimestampsRange)

module.exports = router