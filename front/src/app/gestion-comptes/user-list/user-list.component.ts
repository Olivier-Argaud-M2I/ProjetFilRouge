import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: User[]= [];

  constructor(private userService:UserService,private router:Router) {

  }

  ngOnInit(): void {

  }

  ngOnChanges():void {
    this.ngOnInit();
  }

  editer(user:User){
    this.router.navigate(['userdetail/'+user.id])
  }

  supprimer(user:User){
    this.userService.deleteUser(user.id).subscribe(
      ()=>this.refreshUser()
      );
  }

  refreshUser(){
    this.userService.getUsers().subscribe(
      (responses)=>{
        this.users = responses;
      }
    )
  }

}
