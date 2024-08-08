const express = require('express')
const { createExpense, getAllExpense, getExpenseMonthly, deleteExpense, updateExpense, disableExpense } = require('../controller/expenseController');
const { jwtMiddleware } = require('../auth/userAuth');


const expRoute = express.Router()

expRoute.post('/',jwtMiddleware, createExpense)
        .get('/',jwtMiddleware, getAllExpense)
        .get('/total',jwtMiddleware, getExpenseMonthly)
        .delete('/:id', deleteExpense)
        .put('/:id', updateExpense)
       

module.exports = expRoute;