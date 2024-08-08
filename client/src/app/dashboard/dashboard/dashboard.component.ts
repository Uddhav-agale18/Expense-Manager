import { Component, EventEmitter, Output } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ExpState } from '../../states/reducers/expense.reducers';
import { Store } from '@ngrx/store';
import { loadEtypes } from '../../states/actions/type.actions';
import { Expense } from '../../model/expenseModel';
import { getExpenseByMonth, loadExpense } from '../../states/actions/expense.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  data: Expense[] = []
  isShowChat: boolean = false
  years: string[] = [];
  currentYear:string= new Date().getFullYear().toString();

  constructor(private store: Store<{ expReducer: ExpState }>) {

    this.store.select(state => state.expReducer.expenseByMonth).subscribe(e => {
      this.expenseByMonths = e;
    })

    // this.store.select(state => state.expReducer.expense).subscribe(data => {
    //   this.data = data
    // })

  }

  expenseByMonths: any;
  user: { name: "", url: "" } = null;
  year = this.currentYear;
  months = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  ngOnInit(): void {
    this.store.dispatch(getExpenseByMonth())
    // this.store.dispatch(loadExpense())
    this.user = JSON.parse(localStorage.getItem('user'))
    this.generateYears()
  }

  logout() {
    localStorage.removeItem('user')
  }

  generateYears() {
    let year = new Date().getFullYear() - 2;

    for (let i = 0; i < 5; i++) {
        this.years.push(year++ + "")
    }
  }


}
