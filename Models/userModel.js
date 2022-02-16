const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    age: Number,
    city: String,
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    products: [
        { type: mongoose.Types.ObjectId, ref: 'product', require: true }
    ]

});

module.exports = mongoose.model('user', userSchema);