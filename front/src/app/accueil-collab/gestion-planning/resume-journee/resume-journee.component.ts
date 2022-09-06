import {Component, Injectable, InjectionToken, Injector, Input, OnInit} from '@angular/core';
import {Events} from "../../../model/Events";
import {FormBuilder, Validators,FormsModule } from "@angular/forms";
import {LoginService} from "../../../service/login.service";
import {Role} from "../../../model/Role";
import {Router} from "@angular/router";
import {EventsService} from "../../../service/events.service";
import * as moment from 'moment';
import {Moment} from "moment";

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

  // Cette variable contiendra la date à afficher
  dateToShow:String;

  // Cette variable contient la date en son format complet
  currentDate:Date;

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
    this.dateToShow = moment().format('dddd Do MMMM');
    this.currentDate = new Date(moment().format());
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
    this.ngOnInit();
  }

  nextDay(){
    this.jour+=1;
    this.tms+=86400; // 86400 1 jour en plus en seconde
    this.currentDate.setDate(this.currentDate.getDate()+1);
    this.dateToShow = moment(this.currentDate).format('dddd Do MMMM').toString();
    this.refreshEvents();
  }

  previousDay(){
    this.jour-=1;
    this.tms-=86400;
    this.currentDate.setDate(this.currentDate.getDate()-1);
    this.dateToShow = moment(this.currentDate).format('dddd Do MMMM').toString();
    this.refreshEvents();
  }

  editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }

  reset(){
    this.tms=Math.floor(Date.now()/1000);
    this.jour=0;
    this.currentDate = new Date(moment().format());
    this.dateToShow = this.currentDate.toString();
    this.refreshEvents();
  }

}
