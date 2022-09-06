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

  constructor(
    private fb:FormBuilder,
    private _eventsService:EventsService,
    private router:Router,
    private _loginService:LoginService
  ) {
    this.eventsService=_eventsService;
    this.loginService=_loginService;
    this.refreshEvents(Math.floor(Date.now()/1000),this.loginService.userLogged?.id!);
  }


  ngOnInit():void {

  }

  del(id:number){
    this.eventsService.deleteEvent(id).subscribe(
      ()=>{
        this.refreshEvents(Math.floor(Date.now()/1000),this.loginService.userLogged?.id!);
      }
    );
  }

  refreshEvents(timestamp:number,idUser:number){
    this.eventsService.getEventsByDayAndUserId(timestamp,idUser).subscribe(
      (response)=>{
        this.eventsList = response;
      }
    )
  }

  editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }

  refreshEventsNow(){

    this.refreshEvents(Math.floor(Date.now()/1000),this.loginService.userLogged?.id!);

  }

}
