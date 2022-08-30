import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Contact } from 'src/app/model/Contact';
import { User } from 'src/app/model/User';
import { ContactService } from 'src/app/service/contact.service';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  user!: User | null;

  contacts:Contact[]= [];
  
  possibleContacts:User[]= [];


  contactCtrl = this.fb.control('',[Validators.required]);


  contactForm = this.fb.group({
    contact:this.contactCtrl
  });

  constructor(
    private userService:UserService,
    private loginService:LoginService,
    private contactService:ContactService,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.user = this.loginService.userLogged;
    this.getContacts();
    
  }


  getContacts(){
    this.contactService.getContacts(this.user!.id).subscribe(
      (response)=>{
        this.contacts = response;
        this.getPossibleContacts();
      }
    )
  }

  getPossibleContacts(){
    this.userService.getUsers().subscribe(
      (response)=>{
        this.possibleContacts = response.
          filter((u)=>!this.contacts.map(cont=>cont.collaborator.id).includes(u.id)).
          filter((u)=>u.id != this.user?.id); 
        console.log(this.possibleContacts);
      }
    )
  }


  addContact(){
    let cont:any = this.contactForm.get('contact')!.value;
    if(this.user!=null){
      this.contactService.createContact(this.user.id,cont.id).subscribe(
        ()=>this.ngOnInit()
        );
    }



  }

  removeContact(cont:User){
    if(this.user!=null){
      this.contactService.deleteContact(this.user.id,cont.id).subscribe(
        ()=>this.ngOnInit()
      );
    }
  }





  editer(collaborator:User){
    this.router.navigate(['contactdetail/'+collaborator.id])
  }





}
