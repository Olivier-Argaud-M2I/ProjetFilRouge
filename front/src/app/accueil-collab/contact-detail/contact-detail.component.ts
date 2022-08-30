import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarPrivilege } from 'src/app/model/Calendar_Privilege';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact!: User;

  contactPrivileges:CalendarPrivilege[]=[];

  userPrivileges:CalendarPrivilege[]=[];

  constructor(
    private userService:UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getContact();
    this.getUserPrivileges();
    this.getContactPrivileges();
  }



  getContact(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id!=null){
      this.userService.getUser(Number(id)).subscribe(
        (response)=>{
          if(response!=null){
            this.contact = response
          }
          // this.getPrivileges();
        }
      );
    }
  }

  getUserPrivileges(){

  }
 
  getContactPrivileges(){
    
  }

}
