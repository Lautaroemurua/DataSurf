const express = require('express')
const router = express.Router()
const controller = require('../middleware/auth')

router.post('/', controller.login)

module.exports = router