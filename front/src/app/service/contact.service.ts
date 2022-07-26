import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constante } from '../constante';
import { Contact } from '../model/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl: string = Constante.API_URL;

  constructor(private http: HttpClient) { }


  getContactById(id:number){
    return this.http.get<Contact>(this.apiUrl+"/contacts/contact/"+id)
  }

  getContact(idU:number,idC:number){
    return this.http.get<Contact>(this.apiUrl+"/contacts/contact/"+idU+"/"+idC)
  }

  getContacts(id:number){
    return this.http.get<Contact[]>(this.apiUrl+"/contacts/user/"+id)
  }

  createContact(idU:number,idC:number){
    return this.http.post<Contact>(this.apiUrl+"/contacts/create/"+idU+"/"+idC,null)
  }

  updateContact(formData:Contact){
    return this.http.post<Contact>(this.apiUrl+"/contacts/update",formData)
  }

  deleteContact(idU:number,idC:number){
    return this.http.post<Contact>(this.apiUrl+"/contacts/delete/"+idU+"/"+idC,null)
  }


}
