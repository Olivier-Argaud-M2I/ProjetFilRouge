import { Component } from '@angular/core';
// import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
// import dayGridPlugin from '@fullcalendar/daygrid';

// defineFullCalendarElement();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin],
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,dayGridWeek,dayGridDay'
  //   }
  // };
  // toggleWeekends() {
  //   // make a copy while overriding some values
  //   this.calendarOptions = {
  //     ...this.calendarOptions,
  //     weekends: !this.calendarOptions.weekends,
  //   }
  // };
}

