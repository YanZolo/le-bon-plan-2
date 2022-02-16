const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Types.ObjectId, ref: 'user', require: true      
    },
})

module.exports = mongoose.model('product', productSchema)