import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaggonService {

  constructor() { }

  moo() {
    return 'moo123';
  }
}
