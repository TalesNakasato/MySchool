const database = require('../models')

class RegistrationsController {
    static async getRegistratations(req, res) {
        try {
            const Registrations = await database.Registrations.findAll({
                order: [['id', 'ASC']],
                include: [
                    {
                        model: database.Students,
                        attributes: ['name'],
                    },
                    {
                        model: database.Classes,
                        attributes: ['name', 'id'],
                    },
                ]
            })
            return res.status(200).json(Registrations)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getRegistratationsByStudent(req, res) {

        const { id } = req.body

        try {
            const Registrations = await database.Registrations.findAll({
                where: { student_id: Number(id) },
                order: [['id', 'ASC']],
                include: [
                    {
                        model: database.Students,
                        attributes: ['name'],
                    },
                    {
                        model: database.Classes,
                        attributes: ['name', 'id'],
                    },
                ]
            })
            return res.status(200).json(Registrations)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getRegistratationsByClass(req, res) {

        const { id } = req.body

        try {
            const Registrations = await database.Registrations.findAll({
                where: { class_id: Number(id) },
                order: [['id', 'ASC']],
                include: [
                    {
                        model: database.Students,
                        attributes: ['name'],
                    },
                    {
                        model: database.Classes,
                        attributes: ['name', 'id'],
                    },
                ]
            })
            return res.status(200).json(Registrations)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async registerStudentInClass(req, res) {
        const registration = req.body
        try {
            const newCreatedRegistration = await database.Registrations.create(registration)
            return res.status(200).json(newCreatedRegistration)
        }
        catch (error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = RegistrationsController