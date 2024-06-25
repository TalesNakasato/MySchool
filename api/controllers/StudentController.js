const database = require('../models')

class StudentController {
    static async getAllStudents(req, res) {
        try {
            const allStudents = await database.Students.findAll({order: [['name', 'ASC']]})
            return res.status(200).json(allStudents)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getActiveStudent(req, res) {
        try {
            const student = await database.Students.findAll({ order: [['name', 'ASC']], where: { active: true } })
            return res.status(200).json(student)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getOneStudent(req, res) {
        const { id } = req.body
        try {
            const student = await database.Students.findOne({ where: { id: Number(id) } })
            return res.status(200).json(student)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async registerNewStudent(req, res) {
        const newStudent = req.body
        try {
            const newCreatedStudent = await database.Students.create(newStudent)
            return res.status(200).json(newCreatedStudent)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateStudent(req, res) {
        const { id } = req.body
        const newInfo = req.body
        try {
            await database.Students.update(newInfo, { where: { id: Number(id) } })
            const updatedStudent = await database.Students.findOne({ where: { id: Number(id) } })
            return res.status(200).json(updatedStudent)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteStudent(req, res) {
        const { id } = req.body
        try {
            await database.Students.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ menssage: `id ${id} deleted succesfuly` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = StudentController