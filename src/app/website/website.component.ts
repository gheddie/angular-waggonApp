import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {WaggonService} from '../shared/waggon.service';
import {WaggonDto} from '../shared/entity/waggon-dto';
import {TrainDto} from '../shared/entity/train-dto';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  waggonService: WaggonService;

  loadedTrain: TrainDto;

  constructor(private client: HttpClient, aWaggonService: WaggonService) {
    this.waggonService = aWaggonService;
  }

  ngOnInit(): void {
    this.loadedTrain = this.waggonService.getTrain('DerTolleZug');
  }

  postTheStuff() {
    this.waggonService.postWaggon('64','101');
  }
}
