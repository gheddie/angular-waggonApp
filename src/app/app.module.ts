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

const routes: Routes = [
  {path: 'train/:id', component: TrainComponent},
  {path: 'trains', component: TrainListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TrainComponent,
    TrainListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TrainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
