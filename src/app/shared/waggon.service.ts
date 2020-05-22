import { Injectable } from '@angular/core';
import {WaggonDto} from './waggon-dto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WaggonService {

  private client: HttpClient;

  constructor(private aClient: HttpClient) {
    this.client = aClient;
  }

  postWaggon() {
    console.log('service now posting...');
    const body = {movedWaggonNumber: 'Waggon 17', destinationWaggonNumber: 'Waggon 34'};
    this.client.post('http://localhost:8080/moveWaggons', body).subscribe();
    console.log('service posted...');
  }

  getWaggons(): WaggonDto[] {

    let waggons = new Array();

    this.client.get('http://localhost:8080/waggondata')
      .subscribe(data => {
        // console.log('service got data: ' + JSON.parse(data.toString()));
        console.log('read train: ' + data['trainNumber']);
        console.log('read waggon list: ' + data['waggons']);

        length = data['waggons'].length;
        console.log('read waggon list length: ' + length);

        for (let index = 0; index < length; index++) {
          console.log('read waggon ' + index + ': ' + data['waggons'][index]['waggonNumber']);
          waggons.push(new WaggonDto(data['waggons'][index]['waggonNumber']));
        }
      }, error => {
        console.log('error: ');
      });

    /*
    waggons.push(new WaggonDto('123_hanke'));
    waggons.push(new WaggonDto('234_banke'));
    */

    return waggons;
  }
}
