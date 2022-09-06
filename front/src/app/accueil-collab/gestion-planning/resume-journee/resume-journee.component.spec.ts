import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeJourneeComponent } from './resume-journee.component';

describe('ResumeJourneeComponent', () => {
  let component: ResumeJourneeComponent;
  let fixture: ComponentFixture<ResumeJourneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeJourneeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeJourneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
