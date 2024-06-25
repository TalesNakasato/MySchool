const { Router } = require('express')
const levelController = require('../controllers/LevelController')

const router = Router()

router.get('/levels', levelController.getLevels)

module.exports = router