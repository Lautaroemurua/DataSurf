const express = require('express')
const router = express.Router()
const controller = require('../controllers/datasurf')

router.get('/', controller.list)
router.get('/:id', controller.read)

router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

router.get('/timestamps/:from(*)-:to(*)', controller.searchByTimestampsRange)
router.get('/timestamps/:from(*)', controller.searchByTimestampsRange)

module.exports = router