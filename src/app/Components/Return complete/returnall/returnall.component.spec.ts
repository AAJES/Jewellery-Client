import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnallComponent } from './returnall.component';

describe('ReturnallComponent', () => {
  let component: ReturnallComponent;
  let fixture: ComponentFixture<ReturnallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
