import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAllComponent } from './role-all.component';

describe('RoleAllComponent', () => {
  let component: RoleAllComponent;
  let fixture: ComponentFixture<RoleAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
