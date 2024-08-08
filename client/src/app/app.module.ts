import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { etypeReducer } from './states/reducers/type.reducers';
import { EtypeEffects } from './states/effects/type.effects';
import { ExpenseEffects } from './states/effects/expense.effects';
import { ExpReducer } from './states/reducers/expense.reducers';
import { ImgUploadComponent } from './util/img-upload/img-upload.component';
import { YearChartsComponent } from './util/year-charts/year-charts.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { UtilModule } from './util/util.module';


@NgModule({
  declarations: [
    AppComponent,
    ImgUploadComponent,
   
  ],
  imports: [
    UtilModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({
      etypeReducer: etypeReducer,
      expReducer: ExpReducer,
    }),
    EffectsModule.forRoot([EtypeEffects, ExpenseEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    NgApexchartsModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
