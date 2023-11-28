import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsidenavComponent } from './newsidenav.component';

describe('NewsidenavComponent', () => {
  let component: NewsidenavComponent;
  let fixture: ComponentFixture<NewsidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
