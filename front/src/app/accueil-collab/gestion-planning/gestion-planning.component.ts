import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-gestion-planning',
  templateUrl: './gestion-planning.component.html',
  styleUrls: ['./gestion-planning.component.css']
})
export class GestionPlanningComponent implements OnInit {



  calendarView:string;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.calendarView = "daily";
  }

  getNotification(evt:any) {
    this.refresh();
  }

  toDaily(){
    this.calendarView="daily";

  }

  toWeekly(){
    this.calendarView="weekly";

  }

  toMonthly(){
    this.calendarView="monthly";

  }

  ngOnInit(): void {
  }

  refresh(){
    let temp = this.calendarView;
    this.calendarView = "false";
    // now notify angular to check for updates
    this.changeDetector.detectChanges();
    // change detection should remove the component now
    // then we can enable it again to create a new instance
    this.calendarView = temp;
  }
}
