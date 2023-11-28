import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeallComponent } from './modeall.component';

describe('ModeallComponent', () => {
  let component: ModeallComponent;
  let fixture: ComponentFixture<ModeallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
