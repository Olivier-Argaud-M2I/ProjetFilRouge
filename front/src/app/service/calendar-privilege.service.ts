import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constante } from '../constante';
import { CalendarPrivilege } from '../model/Calendar_Privilege';

@Injectable({
  providedIn: 'root'
})
export class CalendarPrivilegeService {

  apiUrl: string = Constante.API_URL;

  constructor(private http: HttpClient) { }


  getCalendarPrivilege(id:number){
    return this.http.get<CalendarPrivilege>(this.apiUrl+"/calendarPrivileges/"+id)
  }

  getCalendarPrivileges(){
    return this.http.get<CalendarPrivilege[]>(this.apiUrl+"/calendarPrivileges/all")
  }

  // createContact(idU:number,idC:number){
  //   return this.http.post<Contact>(this.apiUrl+"/contacts/create/"+idU+"/"+idC,null)
  // }

  // updateContact(formData:Contact){
  //   return this.http.post<Contact>(this.apiUrl+"/contacts/update",formData)
  // }

  // deleteContact(idU:number,idC:number){
  //   return this.http.post<Contact>(this.apiUrl+"/contacts/delete/"+idU+"/"+idC,null)
  // }





}
