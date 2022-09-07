
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarPrivilege } from 'src/app/model/Calendar_Privilege';
import { Contact } from 'src/app/model/Contact';
import { CalendarPrivilegeService } from 'src/app/service/calendar-privilege.service';
import { ContactService } from 'src/app/service/contact.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  link="";

  contact!: Contact;

  userPrivileges:CalendarPrivilege[]=[];

  calendarPrivileges:CalendarPrivilege[]=[];

  valid:boolean=false;

  constructor(
    private userService:UserService,
    private contactService:ContactService,
    private calendarPrivilegeService:CalendarPrivilegeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getContact();
    // this.getUserPrivileges();
    // this.getAllprivileges();
  }



  getContact(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id!=null){
      this.contactService.getContactById(Number(id)).subscribe(
        (response)=>{
          if(response!=null){
            this.contact = response
            this.getAllprivileges()
          }
          // this.getPrivileges();
        }
      );
    }
  }

  getUserPrivileges(){
    this.contactService.getContact(this.contact.collaborator.id,this.contact.user.id).subscribe(
      (cont)=>{
        this.userPrivileges = cont.calendarPrivileges;
        if(this.userPrivileges.filter((priv)=>priv.name === "readEvent").length>0){
          this.valid = true;
          this.link = "/planning/"+this.contact.collaborator.id;
        }
      }
    )


  }


  getAllprivileges(){
    this.calendarPrivilegeService.getCalendarPrivileges().subscribe(
      (response)=>{
        this.calendarPrivileges = response;
        this.getUserPrivileges()
      }
    )
  }



  changeCheckbox(evt:any,calendarPrivilege:CalendarPrivilege) {
    // calendarPrivilege.status = evt.target.checked;
    if(evt.target.checked){
      this.contact.calendarPrivileges.push(calendarPrivilege)
    }
    else{
      this.contact.calendarPrivileges=this.contact.calendarPrivileges.filter((priv)=>calendarPrivilege.id!=priv.id)
    }
    this.saveContact();
  }

  saveContact(){
    this.contactService.updateContact(this.contact).subscribe(
      ()=>this.ngOnInit()
    )
  }


  isValid(priv:CalendarPrivilege){

    return this.contact.calendarPrivileges.map((privi)=>privi.id).indexOf(priv.id)>-1;
  }

  isValidC(priv:CalendarPrivilege){

    return this.userPrivileges.map((privi)=>privi.id).indexOf(priv.id)>-1;
  }

}
