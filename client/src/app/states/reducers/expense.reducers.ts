import { createReducer, on } from '@ngrx/store';
import { Expense } from './../../model/expenseModel';
import * as ExpenseAction from '../actions/expense.actions';
import { state } from '@angular/animations';
import { ExpenseByMonth } from '../../model/expenseByMonth';



export interface ExpState {
    expense: Expense[];
    error: any;
    expenseByMonth: ExpenseByMonth[];
}

export const initialState: ExpState = {
    expense: [],
    error: null,
    expenseByMonth: []
}

export const ExpReducer = createReducer(
    initialState,
    on(ExpenseAction.loadExpenseSuccess, (state, { expense }) => ({ ...state, expense })),
    on(ExpenseAction.loadExpenseFailure, (state, { error }) => ({ ...state, error })),


    on(ExpenseAction.addExpenseSuccess, (state, { expense }) => ({ ...state, expense: [...state.expense, expense] })),
    on(ExpenseAction.addExpenseFailure, (state, { error }) => ({ ...state, error })),


    on(ExpenseAction.deleteExpenseSuccess, (state, { id }) => ({ ...state, expense: state.expense.filter(e => e._id !== id) })),
    on(ExpenseAction.deleteExpenseFailure, (state, { error }) => ({ ...state, error })),


    on(ExpenseAction.updateExpenseSuccess, (state, { expense }) => ({
        ...state,
        expense: state.expense.map(e => e._id == expense._id ? expense : e)

    })),
    on(ExpenseAction.updateExpenseFailure, (state, { error }) => ({ ...state, error })),

    on(ExpenseAction.getExpenseByMonthSuccess, (state, { expenseByMonth }) => ({ ...state, expenseByMonth })),
    on(ExpenseAction.loadExpenseFailure, (state, { error }) => ({ ...state, error }))

)
