import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constante';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = Constant.API_URL;

  constructor(private http: HttpClient) { }

  
  logUser(user:User){
    return this.http.post<User>(this.apiUrl+"/users/log",user)
  }

  getUser(id:number){  
    return this.http.get<User>(this.apiUrl+"/users/user/"+id)
  }

  getUsers(){
    return this.http.get<User[]>(this.apiUrl+"/users/all")
  }

  saveUser(formData:User){
    return this.http.post<User>(this.apiUrl+"/users/save",formData)
  }

  deleteUser(id:number){
    return this.http.post<User>(this.apiUrl+"/users/delete/"+id,null)
  }


}
