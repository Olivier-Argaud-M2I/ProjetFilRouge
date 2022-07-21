import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/User';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameCtrl = this.fb.control('',[Validators.required,Validators.minLength(3)]);
  passwordCtrl = this.fb.control('',[Validators.required,Validators.minLength(5)]);


  userForm = this.fb.group({
    username:this.usernameCtrl,
    password:this.passwordCtrl,
  
  });

  constructor(private fb:FormBuilder,private loginService:LoginService) {

  }

  ngOnInit(): void{
  }

  login(){

    let user:User = this.userForm.value as User;
    this.reset();
    this.loginService.logIn(user);

  }

  reset(){
    this.userForm.reset()
  }
}
