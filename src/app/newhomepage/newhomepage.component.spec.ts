import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewhomepageComponent } from './newhomepage.component';

describe('NewhomepageComponent', () => {
  let component: NewhomepageComponent;
  let fixture: ComponentFixture<NewhomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewhomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
