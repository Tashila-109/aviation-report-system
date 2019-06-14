const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    reportID: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment