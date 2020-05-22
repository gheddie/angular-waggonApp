import { Component, OnInit } from '@angular/core';
import {WaggonService} from '../shared/waggon.service';
import {TrainDto} from '../shared/entity/train-dto';

@Component({
  selector: 'app-trainlist',
  templateUrl: './trainlist.component.html',
  styleUrls: ['./trainlist.component.css']
})
export class TrainlistComponent implements OnInit {

  private waggonService: WaggonService;

  private trains: TrainDto[];

  constructor(aWaggonService: WaggonService) {
    this.waggonService = aWaggonService;
  }

  ngOnInit(): void {
    this.trains = this.waggonService.getTrains();
  }
}
