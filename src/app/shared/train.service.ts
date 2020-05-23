import { Injectable } from '@angular/core';
import {WaggonDto} from './entity/waggon-dto';
import {HttpClient} from '@angular/common/http';
import {TrainDto} from './entity/train-dto';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  private client: HttpClient;

  constructor(private aClient: HttpClient) {
    this.client = aClient;
  }

  changeTrainState(aTrainId: string, anAction: string) {
    console.log('changing train state of train ' + aTrainId + ', action: ' + anAction);
    const body = {trainId: aTrainId, trainAction: anAction};
    this.client.post('http://localhost:8080/changeTrainState', body).subscribe(error => console.log(error));
  }

  switchWaggons(aWaggonNumber: string, aTrainId: string, aDirection: string) {
    console.log('switching waggons, waggon number:' + aWaggonNumber);
    console.log('switching waggons, train id:' + aTrainId);
    console.log('switching waggons, direction:' + aDirection);
    const body = {movedWaggonNumber: aWaggonNumber, trainId: aTrainId, direction: aDirection};
    this.client.post('http://localhost:8080/moveWaggons', body).subscribe(error => console.log(error));
  }

  getTrain(trainNumber: string): TrainDto {

    let train = new TrainDto();
    let aWaggons = new Array();
    this.client.get('http://localhost:8080/waggondata?trainNumber=' + trainNumber)
      .subscribe(data => {

        train.trainNumber = data['trainNumber'];

        console.log('read train: ' + data['trainNumber']);
        console.log('read waggon list: ' + data['waggons']);

        length = data['waggons'].length;
        console.log('read waggon list length: ' + length);

        for (let index = 0; index < length; index++) {
          console.log('read waggon ' + index + ': ' + data['waggons'][index]['waggonNumber']);
          aWaggons.push(new WaggonDto(data['waggons'][index]['waggonNumber'], data['waggons'][index]['waggonType']));
        }
      }, error => {
        console.log('error: ');
      });
    train.waggons = aWaggons;
    return train;
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
          train.trainState = data[index]['trainState'];
          aTrains.push(train);
        }
      }, error => {
        console.log('error: ');
      });

    return aTrains;
  }
}
