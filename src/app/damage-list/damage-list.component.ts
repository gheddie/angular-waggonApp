import {Component, Input, OnInit} from '@angular/core';
import {WaggonDto} from '../shared/entity/waggon-dto';
import {TrainDto} from '../shared/entity/train-dto';
import {ActivatedRoute} from '@angular/router';
import {TrainService} from '../shared/train.service';
import {DamageDto} from '../shared/entity/damage-dto';

@Component({
  selector: 'app-damage-list',
  templateUrl: './damage-list.component.html',
  styleUrls: ['./damage-list.component.css']
})
export class DamageListComponent implements OnInit {

  waggonId: number;

  private trainService: TrainService;

  damages: DamageDto[];

  constructor(private route: ActivatedRoute, aTrainService: TrainService) {
    this.trainService = aTrainService;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.waggonId = +params.get('id');
      console.log('got waggon id: ' + this.waggonId);
    });
    this.damages = this.trainService.getWaggonDamages(this.waggonId);
  }
}
