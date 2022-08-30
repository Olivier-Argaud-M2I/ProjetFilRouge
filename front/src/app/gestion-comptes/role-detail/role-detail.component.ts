import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Privilege } from 'src/app/model/Privilege';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';
import { PrivilegeService } from 'src/app/service/privilege.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {


  privileges:Privilege[] = [];
  role:Role | null = null;


  privilegeCtrl = this.fb.control('',[Validators.required]);


  roleForm = this.fb.group({
    privilege:this.privilegeCtrl
  });

  constructor( 
    private route:ActivatedRoute,
    private privilegeService:PrivilegeService,
    private roleService:RoleService,
    private fb:FormBuilder

    ){

  }


  ngOnInit(): void {
    this.getRole();
  }

  getRole(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id!=null){
      this.roleService.getRole(Number(id)).subscribe(
        (response)=>{
          if(response!=null){
            this.role = response
          }
          this.getPrivileges();
        }
      );
    }
  }

  getPrivileges(){
    this.privilegeService.getPrivileges().subscribe(
      (response)=>{
        this.privileges = response.filter((priv)=>!this.role?.privileges.map(privi=>privi.id).includes(priv.id));
        this.initForm();
      }
    )
  }
  
  initForm(){
    // if(this.user!=null){
    //   this.userForm.get('firstName')!.patchValue(this.user.firstName);
    //   this.userForm.get('lastName')!.patchValue(this.user.lastName);
    //   this.userForm.get('userName')!.patchValue(this.user.userName);
    //   this.userForm.get('role')!.patchValue(this.user.role.name);
    //   // this.userForm.get('role').patchValue(this.roles.filter((role)=>role.id===this.user.role.id)[0]);
    //   console.log(this.userForm.get('role')!.value);

    // }
  }

  update(){
   
    // let reponse:any =  this.userForm.get('role')!.value;
    // this.user!.role = reponse;

    // let role:Role = this.user!.role;
    // console.log(role);
    // console.log(this.user);

    // let firstName1:any = this.userForm.get('firstName')!.value;
    // this.user!.firstName = firstName1;

    // this._loginService.saveUser(this.user!).subscribe();
    // this.router.navigate(['gestionComptes'])
  }

  addPrivilege(){
    let priv:any = this.roleForm.get('privilege')!.value;
    if(this.role!=null){
      this.role!.privileges.push(priv);
      this.roleService.saveRole(this.role).subscribe(()=>this.getPrivileges());
    }
  }

  removePrivilege(priv:Privilege){
    this.role!.privileges = this.role!.privileges.filter((privi)=>priv.id!==privi.id);
    if(this.role!=null){
      this.roleService.saveRole(this.role).subscribe(()=>this.getPrivileges());
    }
  }



}
