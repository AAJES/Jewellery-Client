import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmsHomeComponent } from './vms-home.component';

describe('VmsHomeComponent', () => {
  let component: VmsHomeComponent;
  let fixture: ComponentFixture<VmsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VmsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
