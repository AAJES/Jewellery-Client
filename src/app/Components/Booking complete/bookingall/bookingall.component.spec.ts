import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingallComponent } from './bookingall.component';

describe('BookingallComponent', () => {
  let component: BookingallComponent;
  let fixture: ComponentFixture<BookingallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
