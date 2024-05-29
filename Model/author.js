const mongoose = require('mongoose')

const Author = mongoose.model('Author', mongoose.Schema({
    name: String,
    bio: String,
    website: String
}))

const Course = mongoose.model('Course', mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}))

exports.Author = Author
exports.Course = Course