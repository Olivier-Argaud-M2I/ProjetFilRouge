import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate,CanDeactivate<any>{

  isLogged:boolean=false;
  userLogged:User|null = null;

  constructor(private router:Router) { }


  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isLogged;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isLogged || this.router.parseUrl('/login');
  }

  logIn(user:User){
    this.isLogged = true;
    this.userLogged = user;
    this.router.navigate(['']);
    return this.isLogged
  }

  logOut(){
    this.isLogged = false;
    this.userLogged = null;
    this.router.navigate(['']);
  }
  
}
