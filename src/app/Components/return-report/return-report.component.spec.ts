import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnReportComponent } from './return-report.component';

describe('ReturnReportComponent', () => {
  let component: ReturnReportComponent;
  let fixture: ComponentFixture<ReturnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
