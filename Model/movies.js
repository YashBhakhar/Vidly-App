const mongoose = require('mongoose')
const {genreSchema} = require('../Model/genre')
const Joi = require('joi')

const Movies = new mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        maxLength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        maxLength: 255
    },
}))

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    })

    return schema.validate(movie)
}

exports.validate = validateMovie
exports.Movies = Movies