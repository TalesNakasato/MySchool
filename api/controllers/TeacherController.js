const database = require('../models')

class TeacherController {
    static async getTeachers(req, res) {
        try {
            const teachers = await database.Teachers.findAll({order: [['name', 'ASC']]})
            return res.status(200).json(teachers)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getOneTeacher(req, res) {
        const { id } = req.body
        try {
            const teacher = await database.Teachers.findOne({ where: { id: Number(id) } })
            return res.status(200).json(teacher)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async registerNewTeacher(req, res) {
        const newTeacher = req.body
        try {
            const newCreatedTeacher = await database.Teachers.create(newTeacher)
            return res.status(200).json(newCreatedTeacher)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateTeacher(req, res) {
        const { id } = req.body
        const newInfo = req.body
        try {
            await database.Teachers.update(newInfo, { where: { id: Number(id) } })
            const updatedTeacher = await database.Teachers.findOne({ where: { id: Number(id) } })
            return res.status(200).json(updatedTeacher)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteTeacher(req, res) {
        const { id } = req.body
        try {
            await database.Teachers.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ menssage: `id ${id} deleted succesfuly` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getSubjects(req,res) {
        const subject = 'subject'
        const name = 'name'
        const id = 'id'
        try{
            const subjects = await database.Teachers.findAll({attributes: [subject, name, id] })
            return res.status(200).json(subjects)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TeacherController