import {Component, EventEmitter, Injectable, InjectionToken, Injector, Input, OnInit, Output} from '@angular/core';
import {Events} from "../../../model/Events";
import {FormBuilder, Validators,FormsModule } from "@angular/forms";
import {LoginService} from "../../../service/login.service";
import {Role} from "../../../model/Role";
import {Router} from "@angular/router";
import {EventsService} from "../../../service/events.service";
import * as moment from 'moment';
import {Moment} from "moment";
import {DateManipulation} from "../../../util/DateManipulation";

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
  dm:DateManipulation;
  modification:number = -1; // -1 = désactivé, sinon idEvent pour activer
                            // le form de modification

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
    private _loginService:LoginService,
    private _dm:DateManipulation
  ) {
    this.eventsService=_eventsService;
    this.loginService=_loginService;
    this.dm = _dm;
    this.jour = 0;
    this.tms = Math.floor(Date.now()/1000);
    this.currentDate = new Date(moment().format());
    this.currentDate = this.dm.datetimeToDate(this.currentDate);
    this.dateToShow = this.dm.prepareDateString(this.currentDate);
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
    this.currentDate = moment(this.currentDate).add(1,"days").toDate();
    this.tms = Math.floor(this.currentDate.getTime()/1000);
    this.dateToShow = this.dm.prepareDateString(this.currentDate);
    this.refreshEvents();
  }

  previousDay(){
    this.jour-=1;
    this.currentDate = moment(this.currentDate).add(-1,"days").toDate();
    this.tms = Math.floor(this.currentDate.getTime()/1000);
    this.dateToShow = this.dm.prepareDateString(this.currentDate);
    this.refreshEvents();
  }

  /**editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }*/

  reset(){
    this.jour=0;
    this.currentDate = new Date(moment().format());
    this.currentDate = this.dm.datetimeToDate(this.currentDate);
    this.currentDate = this.dm.datetimeToDate(this.currentDate);
    this.tms=Math.floor(this.currentDate.getTime()/1000);
    this.dateToShow = this.dm.prepareDateString(this.currentDate);
    this.refreshEvents();
  }

  /**
   * Ici on traitera le formulaire de chaque event
   */
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  idCtrl = this.fb.control('',Validators.required);
  nameCtrl = this.fb.control('',Validators.required);
  descriptionCtrl = this.fb.control('');
  datetimeDebutCtrl = this.fb.control('',Validators.required);
  datetimeFinCtrl = this.fb.control('',Validators.required);
  userIdCtrl = this.fb.control('',Validators.required)

  eventModifyForm = this.fb.group({
    id:this.idCtrl,
    name:this.nameCtrl,
    description:this.descriptionCtrl,
    date_debut_timestamp:this.datetimeDebutCtrl,
    date_fin_timestamp:this.datetimeFinCtrl,
    user_id:this.userIdCtrl
  });

  modify(idEvent:number){

    console.log(this.eventModifyForm.value.date_debut_timestamp);
    console.log(this.eventModifyForm.value.date_fin_timestamp);
    let debut = new Date(this.eventModifyForm.value.date_debut_timestamp!).getTime()/1000;
    let fin = new Date(this.eventModifyForm.value.date_fin_timestamp!).getTime()/1000;
    this.eventModifyForm.value.date_debut_timestamp = debut.toString();
    this.eventModifyForm.value.date_fin_timestamp = fin.toString();
    this.eventsService.updateEvent(this.eventModifyForm.value).subscribe(
      ()=>{
        this.notifyParent.emit('refresh');
      }
    );
    this.reset();
  }
  activateFormModif(idEvent:number){
    this.modification=idEvent;
    this.reset();
  }

  deactivateFormModif(){
    this.modification=-1;
    this.reset();
  }

  initForm(eventInfo:Events){

    this.modification=eventInfo.id;
    this.eventModifyForm.get('id')?.patchValue(eventInfo.id.toString());
    this.eventModifyForm.get('name')?.patchValue(eventInfo.name);
    this.eventModifyForm.get('description')?.patchValue(eventInfo.description);
    this.eventModifyForm.get('date_debut_timestamp')?.patchValue(moment(eventInfo.date_debut_timestamp*1000).format("yyyy-MM-ddTHH:mm"));
    this.eventModifyForm.get('date_fin_timestamp')?.patchValue(moment(eventInfo.date_fin_timestamp*1000).format("yyyy-MM-ddTHH:mm"));
    this.eventModifyForm.get('user_id')?.patchValue(eventInfo.user_id.toString());
    this.reset();
  }

  goTo(){

  }
}
