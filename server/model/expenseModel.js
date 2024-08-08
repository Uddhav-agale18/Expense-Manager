const mongoose = require('mongoose');
const User = require('./user.model');

const tagSchema = new mongoose.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true }
});

const expenseSchema = new mongoose.Schema({
    etype: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    tags: {
        type: [tagSchema]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
