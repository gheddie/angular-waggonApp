export class WaggonDto {

  waggonId: number;

  trainId: number;

  waggonNumber: string;

  waggonType: string;

  constructor(aWaggonId: number, aTrain: number, aWaggonNumber: string, aWaggonType: string) {
    this.waggonId = aWaggonId;
    this.trainId = aTrain;
    this.waggonNumber = aWaggonNumber;
    this.waggonType = aWaggonType;
  }
}
