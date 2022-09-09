import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";
import {ContactService} from "../../service/contact.service";

@Component({
  selector: 'app-gestion-planning',
  templateUrl: './gestion-planning.component.html',
  styleUrls: ['./gestion-planning.component.css']
})
export class GestionPlanningComponent implements OnInit {


  idForPlanning!:number;

  user!:User;

  write:boolean= false;

  calendarView:string;

  viewForm:boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private logingService:LoginService,
    private userService:UserService,
    private contactService:ContactService
    ) {
    this.idForPlanning = Number(this.route.snapshot.paramMap.get('id'));
    this.calendarView = "false";
    this.viewForm = false;
  }

  getNotification(evt:any) {
    this.refresh();
  }

  toDaily(){
    this.calendarView="daily";

  }

  toWeekly(){
    this.calendarView="weekly";

  }

  toMonthly(){
    this.calendarView="monthly";

  }

  ngOnInit(): void {
    this.idForPlanning = Number(this.route.snapshot.paramMap.get('id'));
    this.calendarView="daily";
    if(this.idForPlanning==this.logingService.userLogged?.id){
      this.write = true;
      this.user = this.logingService.userLogged;
    }
    else{
      this.userService.getUser(this.idForPlanning).subscribe((user)=>{
        this.user=user;
        this.contactService.getContact(this.idForPlanning,this.logingService.userLogged!.id).subscribe(
          (contact)=>{
            this.write=contact.calendarPrivileges.filter((priv)=> priv.name==="addEvent").length>0;
          }
        )
      })
    }


  }

  activateForm(){
    this.viewForm = true;
    this.ngOnInit;
  }

  deactivateForm(){
    this.viewForm = false;
    this.ngOnInit
  }

  refresh(){
    let temp = this.calendarView;
    this.calendarView = "false";
    // now notify angular to check for updates
    this.changeDetector.detectChanges();
    // change detection should remove the component now
    // then we can enable it again to create a new instance
    this.calendarView = temp;
  }
}
