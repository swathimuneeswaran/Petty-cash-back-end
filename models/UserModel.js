const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        maxLength: 1024,
        minlength: 8
    },
    
},
{
    timestamps: true,
    versionKey: false
});


const User=mongoose.model('User', userSchema)
module.exports = {User}