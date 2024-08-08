import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../model/expenseModel';
import { ExpenseByMonth } from '../model/expenseByMonth';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getAllExpense(): Observable<{ message: string, data: Expense[] }> {
    return this.http.get<{ message: string, data: Expense[] }>("http://localhost:3000/exp/", { withCredentials: true });
  }

  createExpense(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/exp/', data, { withCredentials: true })
  }

  updateExpense(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/exp/${id}`, data, { withCredentials: true })
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/exp/' + id, { withCredentials: true })
  }

  getExpense(id: string): Observable<any> {
    return this.http.get('http://localhost:3000/exp/' + id, { withCredentials: true })
  }

  getDataByMonths(): Observable<{ message: string, data: ExpenseByMonth[] }> {
    return this.http.get<{ message: string, data: ExpenseByMonth[] }>('http://localhost:3000/exp/total', { withCredentials: true })
  }

}
