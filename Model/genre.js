const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(genre)
}

exports.genreSchema = genreSchema
exports.Genres = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}))
exports.validate = validateGenre