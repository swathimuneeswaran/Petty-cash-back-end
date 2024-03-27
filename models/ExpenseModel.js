const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"expense"
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,  
        ref:"User", 
        required:true
    },
}, {timestamps: true,versionKey:false})

module.exports = mongoose.model('expenses', ExpenseSchema)