const { Router } = require('express')
const ClassController = require('../controllers/ClassController')

const router = Router()

router.get('/classes', ClassController.getClasses)
router.post('/classes', ClassController.createClass)
router.delete('/classes/:id', ClassController.deleteClass)

module.exports = router