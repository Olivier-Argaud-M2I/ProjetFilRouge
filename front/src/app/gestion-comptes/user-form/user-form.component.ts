import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

 
  firstnameCtrl = this.fb.control('',[Validators.required]);
  lastnameCtrl = this.fb.control('',[Validators.required]);


  userForm = this.fb.group({
    firstname:this.firstnameCtrl,
    lastname:this.lastnameCtrl,
  
  });

  constructor(private fb:FormBuilder,private loginService:LoginService) {

  }

  ngOnInit(): void{
  }

  create(){

    let user:User = this.userForm.value as User;
    user.password = user.firstname;
    user.username = user.firstname.charAt(0)+user.lastname;
    this.reset();
    this.loginService.createUser(user);

  }

  reset(){
    this.userForm.reset()
  }
}
