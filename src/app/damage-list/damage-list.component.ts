import {Component, Input, OnInit} from '@angular/core';
import {WaggonDto} from '../shared/entity/waggon-dto';
import {TrainDto} from '../shared/entity/train-dto';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-damage-list',
  templateUrl: './damage-list.component.html',
  styleUrls: ['./damage-list.component.css']
})
export class DamageListComponent implements OnInit {

  @Input() str: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.str = params['record'];
    });
  }
}
