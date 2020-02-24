import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApprouteModule } from './app.route.module';
import { HttpClientModule } from '@angular/common/http';
import {WebcamModule} from 'ngx-webcam';

import { MaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { UtilComponent } from './components/util.component';
import { UtilcamComponent } from './components/utilcam.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DialogComponent } from './components/dialog.component';
import { BuslistComponent } from './components/buslist.component';
import { OpencamdialogComponent } from './components/opencamdialog.component'


@NgModule({
  declarations: [
    AppComponent,
    UtilComponent,
    UtilcamComponent,
    DialogComponent,
    BuslistComponent,
    OpencamdialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ApprouteModule,
    HttpClientModule,
    WebcamModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    OpencamdialogComponent
  ],
})
export class AppModule { }
