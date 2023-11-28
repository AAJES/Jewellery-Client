import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalallComponent } from './metalall.component';

describe('MetalallComponent', () => {
  let component: MetalallComponent;
  let fixture: ComponentFixture<MetalallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetalallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetalallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
