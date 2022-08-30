
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../model/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate,CanDeactivate<any>{


  isLogged:boolean=false;
  userLogged:User|null = null;


  constructor(private router:Router,private userService:UserService) { 
;
  }


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
    this.userService.logUser(user).subscribe(
      (response)=>{
        if(response!=null){
          this.isLogged = true;
          this.userLogged = response;
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


  

}
