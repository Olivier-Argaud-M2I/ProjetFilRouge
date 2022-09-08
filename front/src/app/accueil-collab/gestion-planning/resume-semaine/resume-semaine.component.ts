import {Component, Input, OnInit} from '@angular/core';
import {Events} from "../../../model/Events";
import {EventsService} from "../../../service/events.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../../service/login.service";
import * as moment from "moment/moment";
import {DateManipulation} from "../../../util/DateManipulation";

const daysOfTheWeek:String = "Dimanche Lundi Mardi Mercredi Jeudi Vendredi Samedi";

@Component({
  selector: 'app-resume-semaine',
  templateUrl: './resume-semaine.component.html',
  styleUrls: ['./resume-semaine.component.css']
})
export class ResumeSemaineComponent implements OnInit {
  @Input()id!:number;

  eventsList: Events[] = [];
  daysList: String[] = [];
  eventsService:EventsService;
  loginService:LoginService;
  dm:DateManipulation;

  // Ces variables contiendront les date à afficher
  daysMap:Map<String, Date>;
  // dateToShowEnd:String;

  // Ces variable contiendront les date en leur format complet
  actualDate:Date;
  lastMonday:Date;
  actualMonday:Date;
  nextMonday:Date;
  sunday:Date;

  // La variable jour sert de compteur pour naviguer entre les jours
  semaine:number;

  // Les timestamp d'ancrage dans la semaine permettent d'obtenir les tms
  tms:number;

  /**
   * dans le constructeur on instancie les variables suivantes:
   * le tms actuel
   * la date actuelle
   * le lundi actuel (si date au milieu de la semaine)
   * le lundi dernier (lundi actuel -7j)
   * le lundi prochain (lundi actuel +7)
   * le dimanche actuel (lundi prochain -1sec)
   *
   * @param fb
   * @param _eventsService
   * @param router
   * @param _loginService
   * @param _dm
   */
  constructor(
    private fb:FormBuilder,
    private _eventsService:EventsService,
    private router:Router,
    private _loginService:LoginService,
    private _dm:DateManipulation
  ) {
    this.eventsService=_eventsService;
    this.loginService=_loginService;
    this.dm=_dm;
    this.semaine=0;
    this.tms=Math.floor(Date.now()/1000);
    this.daysList = daysOfTheWeek.split(" ");
    this.actualDate = moment(Date.now()).toDate();
    this.actualMonday = this.dm.findActualMondayFromTms(this.tms);
    this.lastMonday = this.dm.findLastMonday(this.actualMonday);
    this.nextMonday = this.dm.findNextMonday(this.actualMonday);
    this.sunday = moment(this.nextMonday.getTime()-1).toDate();
    this.daysMap = new Map<String, Date>();
    this.refreshEvents();
  }

  ngOnInit():void {
    this.eventsService.getEventsByWeekAndUserId(this.tms,this.id).subscribe(
      (response)=>{
        this.eventsList = response;
      }
    )
  }

  del(id:number){
    this.eventsService.deleteEvent(id).subscribe(
      ()=>{
        this.refreshEvents();
      }
    );
  }

  refreshEvents(){
    this.ngOnInit();
  }

  /**
   * Semaine suivante :
   * 1. le lundi actuel devient l'ancien lundi
   * 2. le lundi prochain devient le lundi actuel
   * 3. on utilise findNextMonday avec le lundi actuel
   *        pour trouver le lundi prochain
   * 4. le dimanche devient nextMonday - 1 sec
   */

  nextWeek(){
    this.semaine+=1;
    this.lastMonday = this.actualMonday; // 1
    this.actualMonday = this.nextMonday; // 2
    this.nextMonday = this.dm.findNextMonday(this.actualMonday); // 3
    this.sunday = moment(this.nextMonday.getTime()-1).toDate(); // 4
    this.tms = this.actualMonday.getTime()/1000; // environ 604800 7 jour en plus en seconde
    this.refreshEvents();
  }

  previousWeek(){
    this.semaine-=1;
    this.nextMonday = this.actualMonday;
    this.actualMonday = this.lastMonday;
    this.lastMonday = this.dm.findLastMonday(this.actualMonday);
    this.sunday = moment(this.nextMonday.getTime()-1).toDate();
    this.tms = this.actualMonday.getTime()/1000;
    this.refreshEvents();
  }

  editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }

  reset(){
    this.semaine=0;
    this.tms=Math.floor(Date.now()/1000);
    this.actualDate = moment(Date.now()).toDate();
    this.actualMonday = this.dm.findActualMondayFromTms(this.tms);
    this.lastMonday = this.dm.findLastMonday(this.actualMonday);
    this.nextMonday = this.dm.findNextMonday(this.actualMonday);
    this.sunday = moment(this.nextMonday.getTime()-1).toDate();
    this.refreshEvents()
  }

  fillMap(tms:number){

    let d:Date = new Date(tms);
    this.daysMap.set("Lundi",d);
    this.daysMap.set("Mardi",moment(d).add(1,"day").toDate());
    this.daysMap.set("Mercredi",moment(d).add(2,"day").toDate());
    this.daysMap.set("Jeudi",moment(d).add(3,"day").toDate());
    this.daysMap.set("Vendredi",moment(d).add(4,"day").toDate());
    this.daysMap.set("Samedi",moment(d).add(5,"day").toDate());
    this.daysMap.set("Dimanche",moment(d).add(6,"day").toDate());

  }
}
