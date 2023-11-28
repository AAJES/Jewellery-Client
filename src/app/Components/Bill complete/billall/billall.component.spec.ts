import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillallComponent } from './billall.component';

describe('BillallComponent', () => {
  let component: BillallComponent;
  let fixture: ComponentFixture<BillallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
