import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Role } from 'src/app/model/Role';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-gestion-role',
  templateUrl: './gestion-role.component.html',
  styleUrls: ['./gestion-role.component.css']
})
export class GestionRoleComponent implements OnInit {

  
  roles: Role[] = [];

  nameCtrl = this.fb.control('',[Validators.required]);

  roleForm = this.fb.group({
    name:this.nameCtrl
  });

  constructor(private fb:FormBuilder,private loginService:LoginService) {

  }

  ngOnInit(): void{
    this.refreshRole();
  }

  create(){
    let role:Role = this.roleForm.value as Role;
    this.reset();
    this.loginService.saveRole(role).subscribe(
      ()=>{
        this.refreshRole();
      }
    );
  }

  del(id:number){
    this.loginService.deleteRole(id).subscribe(
      ()=>{
        this.refreshRole();
      }
    );
  }

  refreshRole(){
    this.loginService.getRoles().subscribe(
      (response)=>{
        this.roles = response
      }
    )
  }

  reset(){
    this.roleForm.reset()
  }
}
