import { Component, OnInit } from '@angular/core';
import {Events} from "../../../model/Events";
import {EventsService} from "../../../service/events.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resume-semaine',
  templateUrl: './resume-semaine.component.html',
  styleUrls: ['./resume-semaine.component.css']
})
export class ResumeSemaineComponent implements OnInit {

  eventsList: Events[] = [];
  eventsService:EventsService;

  constructor(
    private fb:FormBuilder,
    private _eventsService:EventsService,
    private router:Router
  ) {
    this.eventsService=_eventsService;
    this.refreshEvents();
  }


  ngOnInit():void {

  }

  del(id:number){
    this.eventsService.deleteEvent(id).subscribe(
      ()=>{
        this.refreshEvents();
      }
    );
  }

  refreshEvents(){
    this.eventsService.getEvents().subscribe(
      (response)=>{
        this.eventsList = response;
      }
    )
  }

  editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }

}
