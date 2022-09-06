import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSemaineComponent } from './resume-semaine.component';

describe('ResumeSemaineComponent', () => {
  let component: ResumeSemaineComponent;
  let fixture: ComponentFixture<ResumeSemaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeSemaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
