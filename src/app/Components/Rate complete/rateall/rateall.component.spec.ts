import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateallComponent } from './rateall.component';

describe('RateallComponent', () => {
  let component: RateallComponent;
  let fixture: ComponentFixture<RateallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
