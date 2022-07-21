import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilCollabComponent } from './accueil-collab.component';

describe('AccueilCollabComponent', () => {
  let component: AccueilCollabComponent;
  let fixture: ComponentFixture<AccueilCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
