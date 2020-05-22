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
    const body = {movedWaggonNumber: 'Waggon 1', destinationWaggonNumber: 'Waggon 134.429oooooooooo'};
    this.client.post('http://localhost:8080/moveWaggons', body).subscribe();
    console.log('service posted...');
  }

  getWaggons(): WaggonDto[] {

    // const jsonString = '{trainNumber: \'123booooooooooooner\', waggons: [{waggonNumber: \'W11\'}, {waggonNumber: \'W123456\'}]}';
    // JSON.parse(jsonString);

    console.log('parsed: ' + JSON.parse('{"name": "Bob", "error": false}'));

    // ---

    this.client.get('http://localhost:8080/waggondata')
      .subscribe(data => {
        // console.log('service got data: ' + JSON.parse(data.toString()));
        console.log('read train: ' + data['trainNumber']);
        console.log('read waggon list: ' + data['waggons']);

        length = data['waggons'].length;
        console.log('read waggon list length: ' + length);

        for (let index = 0; index < length; index++) {
          // console.log('Block statement execution no.');
          console.log('read waggon ' + index + ': ' + data['waggons'][index]['waggonNumber']);
        }

        /*
        console.log('read waggon 1: ' + data['waggons'][0]['waggonNumber']);
        console.log('read waggon 2: ' + data['waggons'][1]['waggonNumber']);
        console.log('read waggon 3: ' + data['waggons'][2]['waggonNumber']);
        console.log('read waggon 3: ' + data['waggons'][3]['waggonNumber']);
        */
      }, error => {
        console.log('error: ');
      });

    // return new WaggonDto();
    let waggons;
    waggons = [
      new WaggonDto('123hanke'),
      new WaggonDto('234banke'),
      new WaggonDto('345zanke'),
      new WaggonDto('123hankeooooooooooooooo')
    ];

    return waggons;
  }
}
