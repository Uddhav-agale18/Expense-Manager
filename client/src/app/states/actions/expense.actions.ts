

import { createAction, props } from "@ngrx/store";
import { Expense } from "../../model/expenseModel";
import { ExpenseByMonth } from "../../model/expenseByMonth";

export const loadExpense = createAction('[expense] load expense');
export const loadExpenseSuccess = createAction('[expense] load expense success', props<{ message: string, expense: Expense[] }>())
export const loadExpenseFailure = createAction('[expense] load expense failure ', props<{ error: string }>())

export const addExpense = createAction('[expense] add expense', props<{ expense: Expense }>());
export const addExpenseSuccess = createAction('[expense] add expense success', props<{ expense: Expense }>())
export const addExpenseFailure = createAction('[expense] add expense failure ', props<{ error: string }>())

export const deleteExpense = createAction('[expense] delete expense', props<{ id: string }>())
export const deleteExpenseSuccess = createAction('[expense] delete expense success', props<{ id: string }>())
export const deleteExpenseFailure = createAction('[expense] delete expense failure', props<{ error: string }>())

export const updateExpense = createAction('[expense] update expense', props<{ id: string, expense: Expense }>())
export const updateExpenseSuccess = createAction('[expense] update expense success', props<{ expense: Expense }>())
export const updateExpenseFailure = createAction('[expense] update expense failure', props<{ error: string }>())

export const getExpenseByMonth = createAction('[expense] get by month');
export const getExpenseByMonthSuccess = createAction('[expense] get by month success', props<{ expenseByMonth: ExpenseByMonth[] }>())
export const getExpenseByMonthFailure = createAction('[expense] get by month failure', props<{ error: any }>())