import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderallComponent } from './genderall.component';

describe('GenderallComponent', () => {
  let component: GenderallComponent;
  let fixture: ComponentFixture<GenderallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
