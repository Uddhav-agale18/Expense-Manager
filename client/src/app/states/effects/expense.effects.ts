import { ExpenseByMonth } from './../../model/expenseByMonth';
import { addExpense, updateExpense, getExpenseByMonth } from './../actions/expense.actions';
import { Injectable } from "@angular/core";
import { ExpenseService } from "../../services/expense.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as ExpenseActions from '../actions/expense.actions'
import { Expense } from '../../model/expenseModel';


@Injectable()
export class ExpenseEffects {

    constructor(private actions$: Actions, private expenseService: ExpenseService) { }

    loadExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.loadExpense),
            mergeMap(() =>
                this.expenseService.getAllExpense().pipe(
                    map(({ data, message }) => ExpenseActions.loadExpenseSuccess({ message, expense: data })),
                    catchError(error => of(ExpenseActions.loadExpenseFailure({ error }))),
                ),
            ),
        ),
    );

    addExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.addExpense),
            mergeMap((action) =>
                this.expenseService.createExpense(action.expense).pipe(
                    map(expense => ExpenseActions.addExpenseSuccess({ expense })),
                    catchError(error => of(ExpenseActions.addExpenseFailure({ error })))
                ))
        )
    )

    deleteExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.deleteExpense),
            mergeMap((action) =>
                this.expenseService.deleteExpense(action.id).pipe(
                    map(() => ExpenseActions.deleteExpenseSuccess({ id: action.id })),
                    catchError(error => of(ExpenseActions.deleteExpenseFailure({ error })))
                )
            )
        ))

    updateExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.updateExpense),
            mergeMap((action) =>
                this.expenseService.updateExpense(action.id, action.expense).pipe(
                    map((expense) => ExpenseActions.updateExpenseSuccess({ expense })),
                    catchError(error => of(ExpenseActions.updateExpenseFailure({ error })))
                ))
        ))

    getExpenseByMonth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.getExpenseByMonth),
            mergeMap(() =>
                this.expenseService.getDataByMonths().pipe(
                    map(({ message, data }) => ExpenseActions.getExpenseByMonthSuccess({ expenseByMonth: data })),
                    catchError((error) => of(ExpenseActions.getExpenseByMonthFailure({ error })))
                )
            )
        ))
}