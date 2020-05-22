import { TestBed } from '@angular/core/testing';

import { WaggonService } from './waggon.service';

describe('WaggonService', () => {
  let service: WaggonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaggonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
