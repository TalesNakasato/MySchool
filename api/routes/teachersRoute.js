const { Router } = require('express')
const TeacherController = require('../controllers/TeacherController')

const router = Router()

router.get('/teachers', TeacherController.getTeachers)
router.get('/teachers/subjects', TeacherController.getSubjects)
router.post('/teachers', TeacherController.registerNewTeacher)
router.post('/teachers/:id', TeacherController.getOneTeacher)
router.put('/teachers/edit/:id', TeacherController.updateTeacher)
router.delete('/teachers/:id', TeacherController.deleteTeacher)

module.exports = router