const express = require('express')
const router = express.Router()
const controller = require('../middleware/auth')

router.post('/', controller.login)
//router.get('/', controller.logout)

module.exports = router