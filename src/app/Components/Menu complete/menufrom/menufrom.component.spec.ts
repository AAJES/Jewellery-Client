import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenufromComponent } from './menufrom.component';

describe('MenufromComponent', () => {
  let component: MenufromComponent;
  let fixture: ComponentFixture<MenufromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenufromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenufromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
