const database = require('../models')

class ClassController {
    static async getClasses(req, res) {
        try {
            const Classes = await database.Classes.findAll({
                order: [['id', 'ASC']],
                include: [
                    {
                        model: database.Students,
                        attributes: ['name'],
                    },
                    {
                        model: database.Teachers,
                        attributes: ['name'],
                    },
                    {
                        model: database.Levels,
                        attributes: ['level'],
                    },
                ],
            })
            return res.status(200).json(Classes)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createClass(req, res) {
        const newClass = req.body
        try {
            const newCreatedClass = await database.Classes.create(newClass)
            return res.status(200).json(newCreatedClass)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteClass(req, res) {
        const { id } = req.body
        try {
            await database.Classes.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ menssage: `id ${id} deleted succesfuly` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = ClassController