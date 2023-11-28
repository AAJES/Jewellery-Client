import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productpurchase2Component } from './productpurchase2.component';

describe('Productpurchase2Component', () => {
  let component: Productpurchase2Component;
  let fixture: ComponentFixture<Productpurchase2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Productpurchase2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productpurchase2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
