import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  loginService:LoginService;
  router:Router;

  constructor(private _loginService:LoginService,private _router:Router) { 
    this.loginService = _loginService;
    this.router = _router;
  }

  ngOnInit(): void {
  }

  editer(user:User){
    this.router.navigate(['userdetail/'+user.username])
  }

  supprimer(user:User){
    this.loginService.delUser(user);
  }

}
