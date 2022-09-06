import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  firstnameCtrl = this.fb.control('',[Validators.required]);
  lastnameCtrl = this.fb.control('',[Validators.required]);
  emailCtrl = this.fb.control('',[Validators.required]);
  telephoneCtrl = this.fb.control('',[Validators.required]);
  usernameCtrl = this.fb.control('',[Validators.required]);
  motDePasseCtrl = this.fb.control('',[Validators.required]);

  userForm = this.fb.group({
    userName: this.usernameCtrl,
    firstName:this.firstnameCtrl,
    lastName:this.lastnameCtrl,
    email:this.emailCtrl,
    telephone:this.telephoneCtrl,
    password: this.motDePasseCtrl,


  });

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router
    ) {

  }

  ngOnInit(): void{
  }

  create(){

    let user:User = this.userForm.value as User;
    // user.password = user.firstName;
    // user.userName = user.firstName.charAt(0)+user.lastName;
    this.reset();
    this.userService.saveUser(user).subscribe(
      ()=>this.router.navigate(['gestionComptes'])
    );

  }

  reset(){
    this.userForm.reset()
  }
}
