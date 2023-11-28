import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserallComponent } from './userall.component';

describe('UserallComponent', () => {
  let component: UserallComponent;
  let fixture: ComponentFixture<UserallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
