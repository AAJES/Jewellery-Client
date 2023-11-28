import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurityallComponent } from './purityall.component';

describe('PurityallComponent', () => {
  let component: PurityallComponent;
  let fixture: ComponentFixture<PurityallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurityallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurityallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
