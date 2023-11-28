import { ComponentFixture, TestBed } from '@angular/core/testing';
import { titlebarComponent } from './titlebarComponent';

describe('TitlebarComponent', () => {
  let component: titlebarComponent;
  let fixture: ComponentFixture<titlebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [titlebarComponent]
    });
    fixture = TestBed.createComponent(titlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
