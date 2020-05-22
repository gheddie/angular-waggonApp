import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupsiComponent } from './pupsi.component';

describe('PupsiComponent', () => {
  let component: PupsiComponent;
  let fixture: ComponentFixture<PupsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
