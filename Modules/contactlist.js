let mongoose = require('mongoose')
let contactSchema = new mongoose.Schema({
    firstname: {
    type: String,
    required: true
    },
    lastname: {
        type: String,
        required: true
        },
    telephone:Number,
    email: String
})


module.exports = mongoose.model('ContactList', contactSchema)