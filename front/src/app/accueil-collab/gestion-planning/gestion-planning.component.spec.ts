import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlanningComponent } from './gestion-planning.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import list from '@fullcalendar/list';
import timeGrid from '@fullcalendar/timegrid';


@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})



export class AppModule { }

export class AppComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

}

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
