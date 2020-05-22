import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {convertRuleOptions} from 'tslint/lib/configuration';
import {WaggonService} from '../shared/waggon.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  priceEur: number;

  constructor(private client: HttpClient, waggonService: WaggonService) {
    console.log('moo: ' + waggonService.moo());
  }

  ngOnInit(): void {

    this.client.get('http://localhost:8080/waggondata')
      .subscribe(data => {
        this.priceEur = data['EUR'];
        console.log(data);
        console.log('eurossss: ' + this.priceEur);
      }, error => {
        console.log('error: ');
      });


  }

  postTheStuff() {

    console.log('now posting...');
    const body = {movedWaggonNumber: 'Waggon 1', destinationWaggonNumber: 'Waggon 134a'};
    // const body = {user: 'Waggon 7'};
    this.client.post('http://localhost:8080/moveWaggons', body).subscribe();
    console.log('posted...');
  }
  // ---
  /*
  this.client.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
    .subscribe(data => {
      this.priceEur = data['EUR'];
      console.log(data);
      console.log('euros aktuell: ' + this.priceEur);
    }, error => {
      console.log('error: ');
    });
    */

}
