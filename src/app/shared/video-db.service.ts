import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TrainDto} from './entity/train-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoDBService {

  private client: HttpClient;

  constructor(private aClient: HttpClient) {
    this.client = aClient;
  }

  getTrains(): TrainDto[] {

    let aTrains = new Array();

    this.client.get('http://localhost:8080/traindata')
      .subscribe(data => {
        console.log(data);
        length = data['length'];
        console.log('Anzahl Züge: ' + length);
        for (let index = 0; index < length; index++) {
          let train = new TrainDto();
          train.trainNumber = data[index]['trainNumber'];
          aTrains.push(train);
        }
      }, error => {
        console.log('error: ');
      });

    return aTrains;
  }
}
