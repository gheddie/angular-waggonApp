import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TrainComponent } from './train/train.component';
import { TrainService} from './shared/train.service';

import { RouterModule, Routes } from '@angular/router';
import { TrainListComponent } from './trainlist/train-list.component';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {CreateWaggonDialogComponent} from './train/create-waggon-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { DamageListComponent } from './damage-list/damage-list.component';
import { WaggonComponent } from './waggon/waggon.component';

const routes: Routes = [
  {path: 'train/:id', component: TrainComponent},
  {path: 'trains', component: TrainListComponent},
  {path: 'train/:id/waggon/:id/damages', component: DamageListComponent},
  {path: 'waggon/:id', component: WaggonComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TrainComponent,
    TrainListComponent,
    CreateWaggonDialogComponent,
    DamageListComponent,
    WaggonComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [
    TrainService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
