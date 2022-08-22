import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
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
  roles:Role[] = [];


  firstnameCtrl = this.fb.control('',[Validators.required]);
  lastnameCtrl = this.fb.control('',[Validators.required]);
  usernameCtrl = this.fb.control('',[Validators.required]);
  roleCtrl = this.fb.control('',[Validators.required]);


  userForm = this.fb.group({
    firstName:this.firstnameCtrl,
    lastName:this.lastnameCtrl,
    userName:this.usernameCtrl,
    role:['']
  
  });

  constructor( 
    private _route: ActivatedRoute
    ,private _loginService:LoginService
    ,private fb:FormBuilder
    ,private router:Router
    ){
    this.route = _route;
    this.loginService = _loginService;
  }


  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id!=null){
      this.loginService.getUser(Number(id)).subscribe(
        (response)=>{
          if(response!=null){
            this.user = response
          }
          this.getRoles();
        }
      );
    }
  }

  getRoles(){
    this._loginService.getRoles().subscribe(
      (response)=>{
        this.roles = response;
        this.initForm();
      }
    )
  }
  
  initForm(){
    if(this.user!=null){
      this.userForm.get('firstName')!.patchValue(this.user.firstName);
      this.userForm.get('lastName')!.patchValue(this.user.lastName);
      this.userForm.get('userName')!.patchValue(this.user.userName);
      this.userForm.get('role')!.patchValue(this.user.role.name);
      // this.userForm.get('role').patchValue(this.roles.filter((role)=>role.id===this.user.role.id)[0]);
      console.log(this.userForm.get('role')!.value);

    }
  }

  update(){
   
    let reponse:any =  this.userForm.get('role')!.value;
    this.user!.role = reponse;

    let role:Role = this.user!.role;
    console.log(role);
    console.log(this.user);

    let firstName1:any = this.userForm.get('firstName')!.value;
    this.user!.firstName = firstName1;

    this._loginService.saveUser(this.user!).subscribe();
    this.router.navigate(['gestionComptes'])
  }

}
