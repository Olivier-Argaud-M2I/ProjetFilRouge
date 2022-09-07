import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  link = "/planning/1"
  loginService:LoginService;

  constructor(private _loginService:LoginService) {
    this.loginService = _loginService;
  }

  ngOnInit(): void {
    this.link ="/planning/"+this.loginService.userLogged?.id;
  }

  logout(){
    this.loginService.logOut();
  }


}
