import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbankdetailsComponent } from './allbankdetails.component';

describe('AllbankdetailsComponent', () => {
  let component: AllbankdetailsComponent;
  let fixture: ComponentFixture<AllbankdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllbankdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllbankdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
