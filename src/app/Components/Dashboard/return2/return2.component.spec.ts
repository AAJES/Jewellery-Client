import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Return2Component } from './return2.component';

describe('Return2Component', () => {
  let component: Return2Component;
  let fixture: ComponentFixture<Return2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Return2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Return2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
