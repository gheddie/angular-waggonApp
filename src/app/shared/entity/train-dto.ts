import {WaggonDto} from './waggon-dto';

export class TrainDto {

  trainId: number;

  trainNumber: string;

  trainState: string;

  waggons: WaggonDto[];

  constructor() {
    // ...
  }

  canDepart() {
    return this.trainState === 'READY_TO_GO';
  }

  canArrive() {
    return this.trainState === 'GONE';
  }
}
