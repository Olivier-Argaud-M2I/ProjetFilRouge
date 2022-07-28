import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  route:ActivatedRoute;
  loginService:LoginService;
  user:User | null = null;


  firstnameCtrl = this.fb.control('',[Validators.required]);
  lastnameCtrl = this.fb.control('',[Validators.required]);
  usernameCtrl = this.fb.control('',[Validators.required]);


  userForm = this.fb.group({
    firstname:this.firstnameCtrl,
    lastname:this.lastnameCtrl,
    username:this.usernameCtrl
  
  });

  constructor( private _route: ActivatedRoute,private _loginService:LoginService,private fb:FormBuilder) {
    this.route = _route;
    this.loginService = _loginService;
  }


  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const username = this.route.snapshot.paramMap.get('id');
    this.user = this.loginService.getUser(username);
    this.initForm();
  }
  
  initForm(){
    if(this.user!=null){
      this.userForm.get('firstname')!.patchValue(this.user.firstname);
      this.userForm.get('lastname')!.patchValue(this.user.lastname);
      this.userForm.get('username')!.patchValue(this.user.username);
    }
  }

  update(){

  }

}
