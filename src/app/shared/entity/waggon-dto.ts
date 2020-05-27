export class WaggonDto {

  waggonId: number;

  trainId: number;

  waggonNumber: string;

  waggonType: string;

  waggonLenght: number;

  maximumLoad: number;

  brakeType: string;

  damageCount: number;

  constructor(aWaggonId: number, aTrain: number, aWaggonNumber: string, aWaggonType: string,
              aWaggonLenght: number, aMaximumLoad: number, aBrakeType: string, aDamageCount: number) {
    this.waggonId = aWaggonId;
    this.trainId = aTrain;
    this.waggonNumber = aWaggonNumber;
    this.waggonType = aWaggonType;

    this.waggonLenght = aWaggonLenght;
    this.maximumLoad = aMaximumLoad;
    this.brakeType = aBrakeType;

    this.damageCount = aDamageCount;
  }
}
