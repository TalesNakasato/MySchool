const bodyParser = require('body-parser')
const students = require('./studentsRoute')
const teachers = require('./teachersRoute')
const levels = require('./levelsRoute')
const classes = require('./classesRoute')
const registers = require('./registrationRoute')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(students)
    app.use(teachers)
    app.use(levels)
    app.use(classes)
    app.use(registers)
}