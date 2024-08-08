import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { ExpDashboardComponent } from './exp-dashboard/exp-dashboard.component';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {  MatSortModule } from '@angular/material/sort';
import {  MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddFormComponent } from './exp-dashboard/add-form/add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UtilModule } from "../util/util.module";

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: ExpDashboardComponent, title: "Expense/Dashboard" }
];

@NgModule({
  declarations: [
    ExpDashboardComponent,
    AddFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
 UtilModule
],
})
export class ExpenseModule { }
