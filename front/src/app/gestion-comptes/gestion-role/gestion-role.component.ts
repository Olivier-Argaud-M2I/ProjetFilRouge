import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { LoginService } from 'src/app/service/login.service';
import { RoleService } from 'src/app/service/role.service';

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

  constructor(
    private fb:FormBuilder,
    private roleService:RoleService,
    private router:Router
    ) {

  }

  ngOnInit(): void{
    this.refreshRole();
  }

  create(){
    let role:Role = this.roleForm.value as Role;
    this.reset();
    this.roleService.saveRole(role).subscribe(
      ()=>{
        this.refreshRole();
      }
    );
  }

  del(id:number){
    this.roleService.deleteRole(id).subscribe(
      ()=>{
        this.refreshRole();
      }
    );
  }

  refreshRole(){
    this.roleService.getRoles().subscribe(
      (response)=>{
        this.roles = response
      }
    )
  }

  reset(){
    this.roleForm.reset()
  }



  editer(role:Role){
    this.router.navigate(['roledetail/'+role.id])
  }

}
