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


  id:number=this.logingSErvice.userLogged!.id;

  user!:User;

  write:boolean= true;

  calendarView:string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private logingSErvice:LoginService,
    private userService:UserService,
    private contactService:ContactService
    ) {
    this.calendarView = "false";
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
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.calendarView="daily";
    this.userService.getUser(this.id).subscribe((user)=>this.user=user)

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
