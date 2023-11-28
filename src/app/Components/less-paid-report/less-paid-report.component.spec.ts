import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessPaidReportComponent } from './less-paid-report.component';

describe('LessPaidReportComponent', () => {
  let component: LessPaidReportComponent;
  let fixture: ComponentFixture<LessPaidReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessPaidReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessPaidReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
