export class DamageDto {

  description: string;

  damageCode: string;

  constructor(aDescription: string, aDamageCode: string) {

    this.description = aDescription;
    this.damageCode = aDamageCode;
  }
}
