import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlanningComponent } from './gestion-planning.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule { }

describe('GestionPlanningComponent', () => {
  let component: GestionPlanningComponent;
  let fixture: ComponentFixture<GestionPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
