import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Totaltransaction2Component } from './totaltransaction2.component';

describe('Totaltransaction2Component', () => {
  let component: Totaltransaction2Component;
  let fixture: ComponentFixture<Totaltransaction2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Totaltransaction2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Totaltransaction2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
