const { Schema, model } = require("mongoose");
module.exports = model('People',
    Schema({
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        mobile: { type: String, required: true },
        password: { type: String, required: true },
        avatar: { type: String, default: '' },
        role: { type: String, enum: ['admin', 'user'], default: 'user' }
    }, {
        timestamps: true
    })

);