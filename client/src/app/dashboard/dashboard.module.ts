import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { YearChartsComponent } from '../util/year-charts/year-charts.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UtilModule } from '../util/util.module';
const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: DashboardComponent, title: "dashboard" }
];

@NgModule({
  declarations: [
    DashboardComponent,
    YearChartsComponent
  ],
  imports: [
    UtilModule,
    CommonModule,
    RouterModule.forChild(routes),
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { }
