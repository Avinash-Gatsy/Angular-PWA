import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GeolocationService } from './geolocation.service';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatIconModule,
         MatInputModule,
         MatSelectModule,
         MatSliderModule,
         MatToolbarModule,
         MatCardModule,
         MatSlideToggleModule,
         MatSnackBarModule} from '@angular/material';
import 'hammerjs';
import { CoffeeComponent } from './coffee/coffee.component';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'coffee', component: CoffeeComponent},
  {path: 'coffee/:id', component: CoffeeComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    CoffeeComponent,
    ListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatToolbarModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    FormsModule,
    HttpModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [GeolocationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
