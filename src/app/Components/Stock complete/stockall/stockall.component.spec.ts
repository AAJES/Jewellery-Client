import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockallComponent } from './stockall.component';

describe('StockallComponent', () => {
  let component: StockallComponent;
  let fixture: ComponentFixture<StockallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
