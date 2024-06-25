const { Router } = require('express')
const StudentController = require('../controllers/StudentController')

const router = Router()

router.get('/students', StudentController.getActiveStudent)
router.get('/students/inactive', StudentController.getAllStudents)
router.post('/students/:id', StudentController.getOneStudent)
router.post('/students', StudentController.registerNewStudent)
router.put('/students/edit/:id', StudentController.updateStudent)
router.delete('/students/:id', StudentController.deleteStudent)

module.exports = router