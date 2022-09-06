import {Component, Injectable, InjectionToken, Injector, Input, OnInit} from '@angular/core';
import {Events} from "../../../model/Events";
import {FormBuilder, Validators,FormsModule } from "@angular/forms";
import {LoginService} from "../../../service/login.service";
import {Role} from "../../../model/Role";
import {Router} from "@angular/router";
import {EventsService} from "../../../service/events.service";

@Component({
  selector: 'app-resume-journee',
  templateUrl: './resume-journee.component.html',
  styleUrls: ['./resume-journee.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ResumeJourneeComponent implements OnInit {

  eventsList: Events[] = [];
  eventsService:EventsService;
  loginService:LoginService;

  // La variable jour sert de compteur pour naviguer entre les jours
  jour:number;

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
    this.jour = 0;
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
    this.eventsService.getEventsByDayAndUserId(this.tms,this.loginService.userLogged?.id!).subscribe(
      (response)=>{
        this.eventsList = response;
      }
    )
  }

  nextDay(){
    this.jour+=1;
    this.tms+=86400; // 86400 1 jour en plus en seconde
    this.refreshEvents();
  }

  previousDay(){
    this.jour-=1;
    this.tms-=86400;
    this.refreshEvents();
  }

  editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }


}
