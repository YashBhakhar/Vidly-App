const mongoose = require('mongoose')
const Joi = require('joi')

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            isGold: {
                type: mongoose.Schema.Types.Boolean,
                default: false
            },
            name: {
                type: mongoose.Schema.Types.String,
                required: true
            },
            phone: {
                type: mongoose.Schema.Types.String,
                required: true
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                maxLength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                maxLength: 255
            },
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}))

function validRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    })

    return schema.validate(rental)
}

exports.Rental = Rental
exports.validate = validRental