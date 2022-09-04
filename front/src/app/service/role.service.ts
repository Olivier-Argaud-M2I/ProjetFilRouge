import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constante } from '../constante';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl: string = Constante.API_URL;

  constructor(private http: HttpClient) { }


  getRole(id:number){
    return this.http.get<Role>(this.apiUrl+"/roles/role/"+id)
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
