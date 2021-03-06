import { Component, OnInit } from '@angular/core';
import {TrainService} from '../shared/train.service';
import {TrainDto} from '../shared/entity/train-dto';

@Component({
  selector: 'app-trainlist',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit {

  private trainService: TrainService;

  trains: TrainDto[];

  constructor(aWaggonService: TrainService) {
    this.trainService = aWaggonService;
  }

  ngOnInit(): void {
    this.trains = this.trainService.getTrains();
  }

  departTrain(trainId: number) {
    if (confirm('Zug abfahren?')) {
      console.log('departing train: ' + trainId);
      this.trainService.changeTrainState(trainId, 'DEPARTURE');
      window.location.reload();
    }
  }

  arriveTrain(trainId: number) {
    if (confirm('Zug ankommen?')) {
      console.log('arriving train: ' + trainId);
      this.trainService.changeTrainState(trainId, 'ARRIVAL');
      window.location.reload();
    }
  }
}
