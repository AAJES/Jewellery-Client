import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpurchaseallComponent } from './productpurchaseall.component';

describe('ProductpurchaseallComponent', () => {
  let component: ProductpurchaseallComponent;
  let fixture: ComponentFixture<ProductpurchaseallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductpurchaseallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductpurchaseallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
