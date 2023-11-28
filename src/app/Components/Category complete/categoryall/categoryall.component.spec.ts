import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryallComponent } from './categoryall.component';

describe('CategoryallComponent', () => {
  let component: CategoryallComponent;
  let fixture: ComponentFixture<CategoryallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
