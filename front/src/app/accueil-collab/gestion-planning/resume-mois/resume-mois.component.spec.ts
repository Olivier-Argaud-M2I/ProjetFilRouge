import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeMoisComponent } from './resume-mois.component';

describe('ResumeMoisComponent', () => {
  let component: ResumeMoisComponent;
  let fixture: ComponentFixture<ResumeMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeMoisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
