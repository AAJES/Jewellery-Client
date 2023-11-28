import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemereceiptsallComponent } from './schemereceiptsall.component';

describe('SchemereceiptsallComponent', () => {
  let component: SchemereceiptsallComponent;
  let fixture: ComponentFixture<SchemereceiptsallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemereceiptsallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemereceiptsallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
