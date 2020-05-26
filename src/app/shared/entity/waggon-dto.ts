export class WaggonDto {

  waggonId: number;

  trainId: number;

  waggonNumber: string;

  waggonType: string;

  waggonLenght: number;

  maximumLoad: number;

  brakeType: string;

  constructor(aWaggonId: number, aTrain: number, aWaggonNumber: string, aWaggonType: string,
              aWaggonLenght: number, aMaximumLoad: number, aBrakeType: string) {
    this.waggonId = aWaggonId;
    this.trainId = aTrain;
    this.waggonNumber = aWaggonNumber;
    this.waggonType = aWaggonType;

    this.waggonLenght = aWaggonLenght;
    this.maximumLoad = aMaximumLoad;
    this.brakeType = aBrakeType;
  }
}
