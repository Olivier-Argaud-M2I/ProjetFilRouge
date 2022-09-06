import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-planning',
  templateUrl: './gestion-planning.component.html',
  styleUrls: ['./gestion-planning.component.css']
})
export class GestionPlanningComponent implements OnInit {

  calendarView:string;

  constructor() {
    this.calendarView = "daily";
  }

  toDaily(){
    this.calendarView="daily";
    this.ngOnInit();
  }

  toWeekly(){
    this.calendarView="weekly";
    this.ngOnInit();
  }

  toMonthly(){
    this.calendarView="monthly";
    this.ngOnInit();
  }

  ngOnInit(): void {
  }

}
