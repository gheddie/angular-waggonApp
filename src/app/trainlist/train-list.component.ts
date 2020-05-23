import { Component, OnInit } from '@angular/core';
import {TrainService} from '../shared/train.service';
import {TrainDto} from '../shared/entity/train-dto';

@Component({
  selector: 'app-trainlist',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit {

  private waggonService: TrainService;

  trains: TrainDto[];

  constructor(aWaggonService: TrainService) {
    this.waggonService = aWaggonService;
  }

  ngOnInit(): void {
    this.trains = this.waggonService.getTrains();
  }

  departTrain() {
    console.log('departing train...');
  }

  arriveTrain() {
    console.log('arriving train...');
  }
}
