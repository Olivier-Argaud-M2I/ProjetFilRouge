import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  link = "/planning/1"
  loginService:LoginService;

  constructor(
    private _loginService:LoginService,
    private router:Router
  ) {
    this.loginService = _loginService;
  }

  ngOnInit(): void {
    this.link ="/planning/"+this.loginService.userLogged?.id;
  }

  logout(){
    this.loginService.logOut();
  }

  redirectTo(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/planning/'+this.loginService.userLogged!.id]));
  }


}
