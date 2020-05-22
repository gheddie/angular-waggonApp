import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {WaggonService} from '../shared/waggon.service';
import {WaggonDto} from '../shared/waggon-dto';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  waggonService: WaggonService;

  loadedWaggons: WaggonDto[];

  constructor(private client: HttpClient, aWaggonService: WaggonService) {
    this.waggonService = aWaggonService;
  }

  ngOnInit(): void {
    this.loadedWaggons = this.waggonService.getWaggons();
  }

  postTheStuff() {
    this.waggonService.postWaggon('64','101');
  }
}
