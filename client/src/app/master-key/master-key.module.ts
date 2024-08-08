import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDashboardComponent } from './master-dashboard/master-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UtilModule } from '../util/util.module';
const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: MasterDashboardComponent, title: "master/dashboard" }
];

@NgModule({
  declarations: [
    MasterDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    UtilModule
  ]
})
export class MasterKeyModule { }
