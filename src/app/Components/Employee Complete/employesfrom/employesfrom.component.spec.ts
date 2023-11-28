import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesfromComponent } from './employesfrom.component';

describe('EmployesfromComponent', () => {
  let component: EmployesfromComponent;
  let fixture: ComponentFixture<EmployesfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployesfromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployesfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
