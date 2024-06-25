const { Router } = require('express')
const RegistrationController = require('../controllers/RegistrationController')

const router = Router()

router.get('/registrations', RegistrationController.getRegistratations)
router.post('/registrations/students/:id', RegistrationController.getRegistratationsByStudent)
router.post('/registrations/classes/:id', RegistrationController.getRegistratationsByClass)
router.post('/registrations',RegistrationController.registerStudentInClass)
module.exports = router