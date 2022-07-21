import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

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
