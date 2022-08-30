import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constante';
import { Privilege } from '../model/Privilege';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  apiUrl: string = Constant.API_URL;

  constructor(private http: HttpClient) { }

    
  getPrivilege(id:number){
    return this.http.get<Privilege>(this.apiUrl+"/privileges/privilege/"+id)
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

}
