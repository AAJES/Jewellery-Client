import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingreturnComponent } from './bookingreturn.component';

describe('BookingreturnComponent', () => {
  let component: BookingreturnComponent;
  let fixture: ComponentFixture<BookingreturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingreturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
