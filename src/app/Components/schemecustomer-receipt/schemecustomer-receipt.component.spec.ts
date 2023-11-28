import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemecustomerReceiptComponent } from './schemecustomer-receipt.component';

describe('SchemecustomerReceiptComponent', () => {
  let component: SchemecustomerReceiptComponent;
  let fixture: ComponentFixture<SchemecustomerReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemecustomerReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemecustomerReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
