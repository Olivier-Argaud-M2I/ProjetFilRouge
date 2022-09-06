import { Component, OnInit } from '@angular/core';
import {Events} from "../../../model/Events";
import {EventsService} from "../../../service/events.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-resume-semaine',
  templateUrl: './resume-semaine.component.html',
  styleUrls: ['./resume-semaine.component.css']
})
export class ResumeSemaineComponent implements OnInit {

  eventsList: Events[] = [];
  eventsService:EventsService;
  loginService:LoginService;

  // La variable jour sert de compteur pour naviguer entre les jours
  semaine:number;

  // Le timestamp d'ancrage dans le mois traité, il est en seconde donc /1000
  tms:number;

  constructor(
    private fb:FormBuilder,
    private _eventsService:EventsService,
    private router:Router,
    private _loginService:LoginService
  ) {
    this.eventsService=_eventsService;
    this.loginService=_loginService;
    this.semaine=0;
    this.tms=Math.floor(Date.now()/1000);
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
    this.eventsService.getEventsByWeekAndUserId(this.tms,this.loginService.userLogged?.id!).subscribe(
      (response)=>{
        this.eventsList = response;
      }
    )
  }

  nextWeek(){
    this.semaine+=1;
    this.tms+=604800; // 604800 7 jour en plus en seconde
    this.refreshEvents();
  }

  previousWeek(){
    this.semaine-=1;
    this.tms-=604800;
    this.refreshEvents();
  }

  editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }

}
