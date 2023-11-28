import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesfromComponent } from './rolesfrom.component';

describe('RolesfromComponent', () => {
  let component: RolesfromComponent;
  let fixture: ComponentFixture<RolesfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesfromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
