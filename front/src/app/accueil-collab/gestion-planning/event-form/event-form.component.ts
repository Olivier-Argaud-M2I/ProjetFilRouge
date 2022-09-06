import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../../../service/login.service";
import {EventsService} from "../../../service/events.service";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  nameCtrl = this.fb.control('',[Validators.required]);
  descriptionCtrl = this.fb.control('');
  datetimeDebutCtrl = this.fb.control('',[Validators.required]);
  datetimeFinCtrl = this.fb.control('',[Validators.required]);
  userIdCtrl = this.fb.control(this.loginService.userLogged?.id!);

  eventForm = this.fb.group({
    name:this.nameCtrl,
    description:this.descriptionCtrl,
    date_debut_timestamp:this.datetimeDebutCtrl,
    date_fin_timestamp:this.datetimeFinCtrl,
    user_id:this.userIdCtrl
  });

  constructor(private fb:FormBuilder,private loginService:LoginService,private eventsService:EventsService) {

  }

  ngOnInit(): void{
  }

  create(){

    let debut = new Date(this.eventForm.value.date_debut_timestamp!).getTime()/1000;
    let fin = new Date(this.eventForm.value.date_fin_timestamp!).getTime()/1000;
    this.eventForm.value.date_debut_timestamp = debut.toString();
    this.eventForm.value.date_fin_timestamp = fin.toString();
    this.eventForm.value.user_id = this.loginService.userLogged?.id!;
    this.eventsService.createEvent(this.eventForm.value).subscribe();
    this.reset();

  }

  reset(){
    this.eventForm.reset()
  }

  verifyDate(){

  }

}
