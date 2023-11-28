import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemereceiptsComponent } from './schemereceipts.component';

describe('SchemereceiptsComponent', () => {
  let component: SchemereceiptsComponent;
  let fixture: ComponentFixture<SchemereceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemereceiptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemereceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
