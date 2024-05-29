const mongoose = require('mongoose')
const Joi = require('joi')

const Customers = mongoose.model('Customers', new mongoose.Schema({
    isGold: {
        type: mongoose.Schema.Types.Boolean
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    phone: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}))

function validateCustomers(customer) {
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        isGold: Joi.boolean()
    })
    return schema.validate(customer)
}

exports.Customers = Customers
exports.validate = validateCustomers