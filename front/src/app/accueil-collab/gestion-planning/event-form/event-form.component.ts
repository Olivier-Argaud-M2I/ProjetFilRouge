import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../../../service/login.service";
import {EventsService} from "../../../service/events.service";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input()idForPlanning!:number;

  nameCtrl = this.fb.control('',[Validators.required]);
  descriptionCtrl = this.fb.control('');
  datetimeDebutCtrl = this.fb.control('',[Validators.required]);
  datetimeFinCtrl = this.fb.control('',[Validators.required]);
  userIdCtrl = this.fb.control(this.idForPlanning);

  eventForm = this.fb.group({
    name:this.nameCtrl,
    description:this.descriptionCtrl,
    date_debut_timestamp:this.datetimeDebutCtrl,
    date_fin_timestamp:this.datetimeFinCtrl,
    user_id:this.userIdCtrl
  });

  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    private eventsService:EventsService
  ) {

  }

  ngOnInit(): void{
  }

  create(){

    let debut = new Date(this.eventForm.value.date_debut_timestamp!).getTime()/1000;
    let fin = new Date(this.eventForm.value.date_fin_timestamp!).getTime()/1000;
    this.eventForm.value.date_debut_timestamp = debut.toString();
    this.eventForm.value.date_fin_timestamp = fin.toString();
    this.eventForm.value.user_id = this.idForPlanning;
    this.eventForm.value.user_id = this.loginService.userLogged?.id!;

    // On utilise la fonction verify pour garantir que deux évènements n'aient
    // pas lieu en même temps
    // Si la listeToCompare renvoit des élèments ce n'est pas bon signe
    //this.eventsService.verify(this.userIdCtrl,debut,fin).subscribe(
    //  (response)=>{
    //    this.eventsListToCompare = response;
    //  }
    //)

    this.eventsService.createEvent(this.eventForm.value).subscribe(
      ()=>{
        this.notifyParent.emit('refresh');
      }
    );
    this.reset();

  }

  reset(){
    this.eventForm.reset()
  }

  verifyDate(){

  }

}
