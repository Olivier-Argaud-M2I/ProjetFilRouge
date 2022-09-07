import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-accueil-collab',
  templateUrl: './accueil-collab.component.html',
  styleUrls: ['./accueil-collab.component.css']
})
export class AccueilCollabComponent implements OnInit {

  router:Router
  id;

  constructor(
    private _router:Router,
    private loginService:LoginService
  ) {
    this.router = _router;
    this.id =loginService.userLogged!.id;
   }

  ngOnInit(): void {
  }


  goPlanning(){
    this.router.navigate(['planning'])
  }
}
