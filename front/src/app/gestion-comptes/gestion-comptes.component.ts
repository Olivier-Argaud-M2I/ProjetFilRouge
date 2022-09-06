import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../model/User";

@Component({
  selector: 'app-gestion-comptes',
  templateUrl: './gestion-comptes.component.html',
  styleUrls: ['./gestion-comptes.component.css']
})
export class GestionComptesComponent implements OnInit {

  users:User[]=[];

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.refreshUser();
  }
  getNotification(evt:any) {
    this.ngOnInit();
  }

  refreshUser(){
    this.userService.getUsers().subscribe(
      (responses)=>{
        this.users = responses;
      }
    )
  }
}
