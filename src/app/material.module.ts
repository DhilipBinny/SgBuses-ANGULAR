import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';


const MODULES = [
    MatToolbarModule,
    MatListModule, MatInputModule,MatExpansionModule,BrowserAnimationsModule,MatTableModule,
    MatDividerModule, MatIconModule, MatCardModule, MatButtonModule, FlexLayoutModule, MatDialogModule,MatGridListModule,MatButtonToggleModule,MatChipsModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})

export class MaterialModule { }
