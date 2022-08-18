import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Privilege } from 'src/app/model/Privilege';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-gestion-privilege',
  templateUrl: './gestion-privilege.component.html',
  styleUrls: ['./gestion-privilege.component.css']
})
export class GestionPrivilegeComponent implements OnInit {

  
  privileges: Privilege[] = [];

  nameCtrl = this.fb.control('',[Validators.required]);

  privilegeForm = this.fb.group({
    name:this.nameCtrl
  });

  constructor(private fb:FormBuilder,private loginService:LoginService) {

  }

  ngOnInit(): void{
    this.refreshPrivilege();
  }

  create(){
    let privilege:Privilege = this.privilegeForm.value as Privilege;
    this.reset();
    this.loginService.savePrivilege(privilege).subscribe(
      ()=>{
        this.refreshPrivilege();
      }
    );
  }

  del(id:number){
    this.loginService.deletePrivilege(id).subscribe(
      ()=>{
        this.refreshPrivilege();
      }
    );
  }

  refreshPrivilege(){
    this.loginService.getPrivileges().subscribe(
      (response)=>{
        this.privileges = response
      }
    )
  }

  reset(){
    this.privilegeForm.reset()
  }

}
