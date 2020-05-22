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

  postWaggon(wn1: string, wn2: string) {
    console.log('service now posting...');
    const body = {movedWaggonNumber: wn1, destinationWaggonNumber: wn2};
    this.client.post('http://localhost:8080/moveWaggons', body).subscribe(error => console.log(error));
  }

  getWaggons(): WaggonDto[] {
    let waggons = new Array();
    this.client.get('http://localhost:8080/waggondata')
      .subscribe(data => {
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
    return waggons;
  }
}
