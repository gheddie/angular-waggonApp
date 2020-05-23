import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainDto} from '../shared/entity/train-dto';
import {TrainService} from '../shared/train.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {

  trains: TrainDto[];

  private trainService: TrainService;

  loadedTrain: TrainDto;

  constructor(private route: ActivatedRoute, aWaggonService: TrainService) {
    this.trainService = aWaggonService;
  }

  ngOnInit(): void {
    console.log('Zug anzeigen: ' + this.route.snapshot.params.id);
    this.loadedTrain = this.trainService.getTrain(this.route.snapshot.params.id);
  }

  switchWaggons() {
    this.trainService.postWaggon('qwe123aaaklauswill','rtz456aaaklaus');
  }

  waggonUp() {
    console.log('waggon up...');
  }

  waggonDown() {
    console.log('waggon down...');
  }
}
