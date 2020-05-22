import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { TrainComponent } from './train/train.component';
import { WebsiteComponent } from './website/website.component';
import { PupsiComponent } from './pupsi/pupsi.component';

import { VideoDBService} from './shared/video-db.service';
import { WaggonService} from './shared/waggon.service';

import { RouterModule, Routes } from '@angular/router';
import { TrainlistComponent } from './trainlist/trainlist.component';

const meineRouten: Routes = [
  {path: 'train/:id', component: TrainComponent},
  {path: 'pupsi', component: PupsiComponent},
  {path: 'website', component: WebsiteComponent},
  {path: 'trains', component: TrainlistComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TrainComponent,
    WebsiteComponent,
    PupsiComponent,
    TrainlistComponent
  ],
  imports: [
    RouterModule.forRoot(meineRouten),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [VideoDBService, WaggonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
