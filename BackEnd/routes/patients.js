const express = require('express')
const router = express.Router()
const controller = require('../controllers/patients')

router.get('/', controller.list)
router.get('/:id', controller.read)

router.post('/', controller.create)
router.put('/:id', controller.logicDelete)
router.put('/:id', controller.update)

router.get('/timestamps/:from(*)-:to(*)', controller.searchByTimestampsRange)
router.get('/timestamps/:from(*)', controller.searchByTimestampsRange)

module.exports = router