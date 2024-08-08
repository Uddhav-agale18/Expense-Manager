import { Component, inject, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ExpState } from '../../states/reducers/expense.reducers';
import { loadExpense } from '../../states/actions/expense.actions';
import * as ExpenseActions from '../../states/actions/expense.actions'
import { Expense } from '../../model/expenseModel';

export interface UserData {
  Type: string,
  Time: string,
  Date: string,
  Amount: string,
  // tags: []
}


@Component({
  selector: 'app-exp-dashboard',
  templateUrl: './exp-dashboard.component.html',
  styleUrl: './exp-dashboard.component.css'
})
export class ExpDashboardComponent {

  users$: Observable<any>;
  error$: Observable<any>;
  error: '' | undefined;
  year: string = '2024';
  expenseToDelete: Expense;

  constructor(private router: Router, private expenseService: ExpenseService,
    private store: Store<{ expReducer: ExpState }>) {
    this.dataSource = new MatTableDataSource(this.People);
  }

  userProfile: any;
  displayedColumns: string[] = ['title', 'type', 'date', 'amount', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  @ViewChild('content') myModal: any;

  private modalService = inject(NgbModal);
  People: UserData[] = [];
  expenseView: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.store.dispatch(ExpenseActions.loadExpense())
    this.store.select(state => state.expReducer.expense).subscribe((data: any) => {
      this.dataSource.data = data
      this.dataSource.filter = this.year
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(id: Expense) {
    this.expenseToDelete = id;
    let ab = {
      etype: this.expenseToDelete?.etype,
      title: this.expenseToDelete?.title,
      desc: this.expenseToDelete?.desc,
      date: this.expenseToDelete?.date,
      amount: this.expenseToDelete?.amount,
      tags: this.expenseToDelete.tags,
      isActive: false
    }
    this.store.dispatch(ExpenseActions.updateExpense({ id: this.expenseToDelete._id, expense: ab }))
  }

  yearUpdate() {
    this.dataSource.filter = this.year;
  }

  showExpense(data: any) {
    this.modalService.open(this.myModal);
    this.expenseView = data;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        // this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
}
