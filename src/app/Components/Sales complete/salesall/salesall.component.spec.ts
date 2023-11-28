import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesallComponent } from './salesall.component';

describe('SalesallComponent', () => {
  let component: SalesallComponent;
  let fixture: ComponentFixture<SalesallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
