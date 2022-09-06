import { Component, OnInit } from '@angular/core';
import {Events} from "../../../model/Events";
import {EventsService} from "../../../service/events.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-resume-mois',
  templateUrl: './resume-mois.component.html',
  styleUrls: ['./resume-mois.component.css']
})
export class ResumeMoisComponent implements OnInit {

  eventsList: Events[] = [];
  eventsService:EventsService;
  loginService:LoginService;

  // La variable mois sert de compteur pour naviguer entre les mois
  mois:number;

  // Le timestamp d'ancrage dans le mois traité, il est en seconde donc /1000
  tms:number;

  constructor(
    private fb:FormBuilder,
    private _eventsService:EventsService,
    private router:Router,
    private _loginService:LoginService
  ) {
    this.eventsService=_eventsService;
    this.loginService = _loginService;
    this.mois = 0;
    this.tms = Math.floor(Date.now()/1000);
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
    this.eventsService.getEventsByMonthAndUserId(this.tms,this.loginService.userLogged?.id!).subscribe(
      (response)=>{
        this.eventsList = response;
      }
    )
  }

  nextMonth(){
    this.mois+=1;
    this.tms+=2764800; // 32 jour en secondes 604800 + 200 sec par sécurité
    this.refreshEvents();
  }

  previousMonth(){
    this.mois-=1;
    this.tms-=2764800;
    this.refreshEvents();
  }

  editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }

}
