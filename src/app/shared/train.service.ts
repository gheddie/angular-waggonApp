import { Injectable } from '@angular/core';
import {WaggonDto} from './entity/waggon-dto';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TrainDto} from './entity/train-dto';
import {DamageDto} from './entity/damage-dto';
import {Observable} from 'rxjs';
import {absoluteFrom} from '@angular/compiler-cli/src/ngtsc/file_system';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  private client: HttpClient;

  constructor(private aClient: HttpClient) {
    this.client = aClient;
  }

  createWaggon(aWaggonNumber: string, aTrainId: number,  atPosition: number) {
    console.log('creating waggon: [aWaggonNumber:' + aWaggonNumber + ', aTrainId:' + aTrainId + ', atPosition:' + atPosition + '].');
    const body = {waggonNumber: aWaggonNumber, trainId: aTrainId, waggonType: 'AVEX', position: atPosition};
    this.client.put('http://localhost:8081/waggon', body).subscribe(
      (response) => {
        // ...
      },
      (error) => {
        console.log('error caught...');
        this.handleError(error);
      }
    );
    console.log('succesfully created waggon ' + aTrainId + '.');
  }

  changeTrainState(aTrainId: number, anAction: string) {

    console.log('changing train state of train ' + aTrainId + ', action: ' + anAction);

    const httpObserver = {
      error: err => {
        console.log('got an ERROR from server...') ;
        this.handleError(err);
      },
      complete: () => {
        console.log('got a NOTIFICATION from server...') ;
        // for 'ajax' feeling...
        /*
        switch (anAction) {
          case 'DEPARTURE':
            console.log('success: altering image (old state: ' + anAction + ')....');
            document.getElementById('departTrainImg' + aTrainId).setAttribute('src', 'assets/ico/arrivetrain.png');
            break;
          case 'ARRIVAL':
            // nothing --> no image anymore (remove if present) !!
            if (document.getElementById('departTrainImg' + aTrainId) != null) {
              document.removeChild(document.getElementById('departTrainImg' + aTrainId));
            }
            break;
        }
        */
      }
    };
    this.client.post('http://localhost:8081/changeTrainState', {trainId: aTrainId, trainAction: anAction}).subscribe(httpObserver);
  }

  manipulateWaggonSequence(aWaggonNumber: string, aTrainId: number, aWaggonManipulationType: string) {
    console.log('manipulating waggon sequence, waggon number:' + aWaggonNumber);
    console.log('manipulating waggon sequence, train id:' + aTrainId);
    console.log('manipulating waggon sequence, direction:' + aWaggonManipulationType);
    const body = {movedWaggonNumber: aWaggonNumber, trainId: aTrainId, waggonManipulationType: aWaggonManipulationType};
    this.client.post('http://localhost:8081/moveWaggon', body).subscribe(
      (response) => {
        // ...
      },
      (error) => {
        console.log('error caught...');
        this.handleError(error);
      }
    );
  }

  getWaggonDamages(waggonId: number) {

    console.log('getWaggonDamages');

    const aDamages = new Array();

    this.client.get('http://localhost:8081/damages?waggonId=' + waggonId)
      .subscribe(data => {

        console.log(data);

        length = (data as object[]).length;
        // length = 3;
        console.log('read damages length: ' + length);

        for (let index = 0; index < length; index++) {
          const newDamage = new DamageDto(
            data[index]['description'],
            data[index]['damageCode']
          );
          console.log('read damage: ' + newDamage.description);
          console.log('pushed damage: ' + newDamage.description);
          aDamages.push(newDamage);
        }
      }, error => {
        this.handleError(error);
      });

    console.log('read ' + aDamages.length + ' damages.');
    return aDamages;
  }

  getTrain(trainId: number): TrainDto {

    console.log('loading train: ' + trainId);

    const train = new TrainDto();
    const aWaggons = new Array();

    this.client.get('http://localhost:8081/waggondata?trainId=' + trainId)
      .subscribe(data => {

        train.trainNumber = data['trainNumber'];
        train.trainId = data['trainId'];

        console.log('read train: ' + data['trainNumber']);
        console.log('read waggon list: ' + data['waggons']);

        length = (data['waggons'] as object[]).length;
        console.log('read waggon list length: ' + length);

        for (let index = 0; index < length; index++) {
          const newWaggon = new WaggonDto(
            +data['waggons'][index]['waggonId'],
            +data['waggons'][index]['trainId'],
            data['waggons'][index]['waggonNumber'],
            data['waggons'][index]['waggonType'],
            data['waggons'][index]['waggonLenght'],
            data['waggons'][index]['maximumLoad'],
            data['waggons'][index]['brakeType'],
            +data['waggons'][index]['damageCount']
          );
          console.log('read waggon ' + index + ': ' + newWaggon.waggonNumber + ' (' + newWaggon.damageCount + ' damages)');
          aWaggons.push(newWaggon);
        }
      }, error => {
        this.handleError(error);
      });

    train.waggons = aWaggons;
    console.log('set ' + aWaggons.length + ' waggons.');
    console.log('loaded train ' + trainId + ' with ' + train.waggons.length + ' waggons.');
    return train;
  }

  getTrains(): TrainDto[] {

    const aTrains = new Array();

    this.client.get('http://localhost:8081/traindata')
      .subscribe(data => {
        console.log(data);
        length = (data as object[]).length;
        console.log('Anzahl Züge: ' + length);
        for (let index = 0; index < length; index++) {
          const train = new TrainDto();
          train.trainId = data[index]['trainId'];
          train.trainNumber = data[index]['trainNumber'];
          train.trainState = data[index]['trainState'];
          aTrains.push(train);
        }
      }, error => {
        this.handleError(error);
      });

    return aTrains;
  }

  handleError(error: object) {
    console.log('handling an error...');
    if (error instanceof  HttpErrorResponse) {
      console.log('error is an HttpErrorResponse, status: ' + (error as HttpErrorResponse).status);
      alert('Fehler (HttpErrorResponse): ' + (error as HttpErrorResponse).error);
    } else {
      alert('Unbekannter Fehler: ' + error);
    }
  }
}
