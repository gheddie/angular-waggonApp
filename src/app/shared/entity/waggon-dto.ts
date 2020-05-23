export class WaggonDto {

  waggonNumber: string;

  waggonType: string;

  constructor(aWaggonNumber: string, aWaggonType: string) {
    this.waggonNumber = aWaggonNumber;
    this.waggonType = aWaggonType;
  }
}
