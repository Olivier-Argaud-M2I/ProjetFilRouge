import { Component, OnInit } from '@angular/core';
import {Events} from "../../../model/Events";
import {EventsService} from "../../../service/events.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../../service/login.service";
import * as moment from "moment/moment";
import {months} from "moment/moment";

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

  // Une valeur qui contient la date actuelle pour se servir de 'moment'
  date:Date;

  // Ici les timestamp qui sont les limites du range mensuel
  //tmsBegin:number;
  //tmsEnd:number;

  // Valeur string à afficher
  actualMonth:String;

  constructor(
    private fb:FormBuilder,
    private _eventsService:EventsService,
    private router:Router,
    private _loginService:LoginService
  ) {
    this.eventsService=_eventsService;
    this.loginService = _loginService;

    this.mois = 0;
    this.date = new Date(moment().format());

    // on récupère le tms
    this.tms = Math.floor(Date.now()/1000);

    // Le mois qui sera affiché
    this.actualMonth = moment().format('MMMM');

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
    this.ngOnInit();
  }

  nextMonth(){
    this.mois+=1;
    this.tms+=2764800; // 32 jour en secondes 604800 + 200 sec par sécurité
    this.date.setMonth(this.date.getMonth()+1);
    this.actualMonth = moment(this.date).format('MMMM');
    this.refreshEvents();
  }

  previousMonth(){
    this.mois-=1;
    this.tms-=2764800;
    this.date.setMonth(this.date.getMonth()-1);
    this.actualMonth = moment(this.date).format('MMMM');
    this.refreshEvents();
  }

  editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }

  reset(){
    this.mois=0;
    this.tms=Math.floor(Date.now()/1000);
    this.date= new Date(moment().format());
    this.actualMonth = moment(this.date).format('MMMM');
    this.refreshEvents();
  }

}
