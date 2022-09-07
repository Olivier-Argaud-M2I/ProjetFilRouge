import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constante} from "../constante";
import {Events} from "../model/Events";

@Injectable({
  providedIn: 'root'
})
export class EventsService{

  apiUrl: string = Constante.API_URL;

  constructor(private router:Router,private http: HttpClient) {
  }

  // Un évènement pour un id
  getEventById(id:number){
    return this.http.get<Events>(this.apiUrl+"/event/"+id);
  }

  // Tous les évènements (pour admin)
  getEvents(){
    return this.http.get<Events[]>(this.apiUrl+"/events/all");
  }

  // Tous les évènements d'un utilisateur
  getEventsByUserId(id:number){
    return this.http.get<Events[]>(this.apiUrl+"/events/allByUserId/"+id);
  }

  // Créer un évènement
  createEvent(formData:any){
    return this.http.post<Events>(this.apiUrl+"/events/create",formData);
  }

  // Mettre à jour un évènement
  updateEvent(formData:any){
    console.log(formData);
    return this.http.post<Events>(this.apiUrl+"/events/update",formData);
  }

  // Supprimer un évènement par son id
  deleteEvent(id:number){
    return this.http.post<Events>(this.apiUrl+"/events/delete/"+id,null);
  }

  // Tous les évènements par jour et par user
  getEventsByDayAndUserId(timestamp:number,id:number){
    return this.http.get<Events[]>(this.apiUrl+"/events/allByDayAndUserId/"+id+"/"+timestamp);
  }

  // Tous les évènements par jour et par user (pour admin)
  getEventsByWeekAndUserId(timestamp:number,id:number){
    return this.http.get<Events[]>(this.apiUrl+"/events/allByWeekAndUserId/"+id+"/"+timestamp);
  }
  // Tous les évènements par jour et par user (pour admin)
  getEventsByMonthAndUserId(timestamp:number,id:number){
    return this.http.get<Events[]>(this.apiUrl+"/events/allByMonthAndUserId/"+id+"/"+timestamp);
  }

}
