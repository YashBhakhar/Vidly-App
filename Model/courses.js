const mongoose = require('mongoose')
const express = require('express')

const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}))

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    })
    return schema.validate(course)
}

exports.Course = Course
exports.validate = validateCourse