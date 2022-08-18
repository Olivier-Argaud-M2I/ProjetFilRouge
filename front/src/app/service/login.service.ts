import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserListComponent } from '../gestion-comptes/user-list/user-list.component';
import { User } from '../model/User';
import { Constant } from '../constante';
import { Privilege } from '../model/Privilege';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate,CanDeactivate<any>{

  apiUrl: string = Constant.API_URL;

  isLogged:boolean=false;
  userLogged:User|null = null;

  users :User[] = [];

  constructor(private router:Router,private http: HttpClient) { 
    // let user:User = new User("admin","admin");
    // user.roles.push("Admin");
    // user.firstName = "admin";
    // user.lastName = "admin";
    // this.users.push(user);
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



  // logIn(user:User):boolean{

  //   this.users.filter((u)=>{
  //     if(user.userName===u.userName &&user.password===u.password){
  //       this.isLogged = true;
  //       this.userLogged = u;
  //       this.router.navigate(['']);
  //       return this.isLogged
  //     }
  //     return false;
  //   })
  //   return false;
  // }


  logIn(user:User){
    this.logUser(user).subscribe(
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
  
  createUser(user:User){
    this.users?.push(user);
  }

  getUser(username:string|null):User|null{
    
    let user:User|null = username!=null ?this.users.filter((u)=>u.userName===username)[0]:null;
    return user;
  }






  public roleMatch(allowedRoles:String[]): boolean {
    if (this.userLogged != null && this.userLogged.role !=null) {

      for (let j = 0; j < allowedRoles.length; j++) {
        if(this.userLogged.role.name === allowedRoles[j]){
          return true;
        }
        for (let i = 0; i < this.userLogged.privileges.length; i++) {
          if (this.userLogged.privileges[i].name === allowedRoles[j]) {
            return true;
          }
        }
      }
      
    }
    return false;
  }


  logUser(user:User){
    return this.http.post<User>(this.apiUrl+"/users/log",user)
  }

  getUsers(){
    return this.http.get<User[]>(this.apiUrl+"/users/all")
  }

  saveUser(formData:Privilege){
    return this.http.post<User>(this.apiUrl+"/users/save",formData)
  }

  deleteUser(id:number){
    return this.http.post<User>(this.apiUrl+"/users/delete/"+id,null)
  }



  getPrivileges(){
    return this.http.get<Privilege[]>(this.apiUrl+"/privileges/all")
  }

  savePrivilege(formData:Privilege){
    return this.http.post<Privilege>(this.apiUrl+"/privileges/save",formData)
  }

  deletePrivilege(id:number){
    return this.http.post<Privilege>(this.apiUrl+"/privileges/delete/"+id,null)
  }


  getRoles(){
    return this.http.get<Role[]>(this.apiUrl+"/roles/all")
  }

  saveRole(formData:Role){
    return this.http.post<Role>(this.apiUrl+"/roles/save",formData)
  }

  deleteRole(id:number){
    return this.http.post<Role>(this.apiUrl+"/roles/delete/"+id,null)
  }

}
