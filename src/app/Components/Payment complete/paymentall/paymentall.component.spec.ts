import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentallComponent } from './paymentall.component';

describe('PaymentallComponent', () => {
  let component: PaymentallComponent;
  let fixture: ComponentFixture<PaymentallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
