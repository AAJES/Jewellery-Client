import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundcommandComponent } from './soundcommand.component';

describe('SoundcommandComponent', () => {
  let component: SoundcommandComponent;
  let fixture: ComponentFixture<SoundcommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundcommandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundcommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
