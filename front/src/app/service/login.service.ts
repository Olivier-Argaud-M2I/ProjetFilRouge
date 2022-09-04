
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constante } from '../constante';
import { JwtResponse } from '../model/JwtResponse';

import { User } from '../model/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate,CanDeactivate<any>{

  apiUrl: string = Constante.API_URL;

  jwToken!:String;

  isLogged:boolean=false;
  userLogged:User|null = null;



  constructor(
    private router:Router,
    private userService:UserService,
    private http:HttpClient
    ) {}


  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isLogged;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const roles = route.data['roles'] as Array<string>;

    if (roles) {
      const match = this.roleMatch(roles);

      if (match) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    return this.isLogged || this.router.parseUrl('/login');
  }



  logIn(user:User){
    this.logUser(user).subscribe(
      (response)=>{
        if(response!=null){
          this.isLogged = true;
          this.userLogged = response.user;
          this.jwToken = response.jwToken;
          this.router.navigate(['']);
        }
        else{
          // this.loginError = true;
          // setTimeout(()=>{                      
          //   this.loginError = false;
          // }, 3000);
        }
       
      }
    )
  }
 


  logOut(){
    this.isLogged = false;
    this.userLogged = null;
    this.router.navigate(['']);
  }

  public roleMatch(allowedRoles:String[]): boolean {
    if (this.userLogged != null && this.userLogged.role !=null) {

      for (let j = 0; j < allowedRoles.length; j++) {
        if(this.userLogged.role.name === allowedRoles[j]){
          return true;
        }
        for (let i = 0; i < this.userLogged.role.privileges.length; i++) {
          if (this.userLogged.role.privileges[i].name === allowedRoles[j]) {
            return true;
          }
        }
      }

    }
    return false;
  }


  
    
  logUser(user:User){
    return this.http.post<JwtResponse>(this.apiUrl+"/jwt/log",user)
  }

}
