import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authgaurdGuard } from './authgaurds/authgaurd.guard';
import { ImgUploadComponent } from './util/img-upload/img-upload.component';
import { YearChartsComponent } from './util/year-charts/year-charts.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), title: 'Auth' },
  { path: 'dashboard', canActivate: [authgaurdGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), title: 'dashboard' },
  { path: 'expense', canActivate: [authgaurdGuard], loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule), title: 'expense' },
  { path: 'master', canActivate: [authgaurdGuard], loadChildren: () => import('./master-key/master-key.module').then(m => m.MasterKeyModule), title: 'masterkey' },
  { path: 'image', component: ImgUploadComponent, },
  { path: 'chart/:id', component: YearChartsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
