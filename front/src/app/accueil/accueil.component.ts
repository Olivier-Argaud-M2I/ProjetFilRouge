import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  loginService:LoginService;

  constructor(private _loginService:LoginService) { 
    this.loginService = _loginService;
  }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logOut();
  }

}
