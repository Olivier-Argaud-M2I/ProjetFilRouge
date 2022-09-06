import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import {User} from "../model/User";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user:User;


  passwordCtrl = this.fb.control('',[Validators.required]);
  password2Ctrl = this.fb.control('',[Validators.required]);

  pwdForm = this.fb.group({
    password: this.passwordCtrl,
    password2:this.password2Ctrl

  });


  constructor(
      private fb:FormBuilder,
      private loginService:LoginService
    ) {
    this.user = loginService.userLogged ?loginService.userLogged : new User();
  }

  ngOnInit(): void {
  }

  changePwd(){
    if(this.pwdForm.value.password === this.pwdForm.value.password2 && this.pwdForm.value.password!=null){
      this.user.password = this.pwdForm.value.password;
      this.loginService.changePwd(this.user).subscribe(
        ()=>this.pwdForm.reset()
      )
    }
  }

}
