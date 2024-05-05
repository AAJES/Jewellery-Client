import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpaymentsComponent } from './pendingpayments.component';

describe('PendingpaymentsComponent', () => {
  let component: PendingpaymentsComponent;
  let fixture: ComponentFixture<PendingpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingpaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
