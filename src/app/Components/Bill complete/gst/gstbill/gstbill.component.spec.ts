import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstbillComponent } from './gstbill.component';

describe('GstbillComponent', () => {
  let component: GstbillComponent;
  let fixture: ComponentFixture<GstbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstbillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
