import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UtilComponent} from './components/util.component';
import {UtilcamComponent} from './components/utilcam.component'


const ROUTES: Routes=[
    { path:'', component:UtilComponent },
    { path:'home', component:UtilComponent },
    { path:"cam", component:UtilcamComponent},
    { path:'**', redirectTo:"/",pathMatch:'full' }
];

@NgModule({

    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
  
})

export class ApprouteModule { }