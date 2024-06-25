const database = require('../models')

class LevelController {
    static async getLevels(req, res) {
        try {
            const levels = await database.Levels.findAll()
            return res.status(200).json(levels)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getOneLevel(req, res) {

        const id = req.body

        try {
            const level = await database.Levels.findOne({ where: {id: Number(id)}})
            return res.status(200).json(level)
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = LevelController