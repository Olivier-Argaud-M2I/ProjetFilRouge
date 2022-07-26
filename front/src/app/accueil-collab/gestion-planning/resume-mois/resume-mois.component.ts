import {Component, Input, OnInit} from '@angular/core';
import {Events} from "../../../model/Events";
import {EventsService} from "../../../service/events.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../../service/login.service";
import * as moment from "moment/moment";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../../model/User";

@Component({
  selector: 'app-resume-mois',
  templateUrl: './resume-mois.component.html',
  styleUrls: ['./resume-mois.component.css']
})
export class ResumeMoisComponent implements OnInit {
  @Input()idForPlanning!:number;

  eventsList: Events[] = [];
  eventsService:EventsService;
  loginService:LoginService;

  // La variable mois sert de compteur pour naviguer entre les mois
  mois:number;

  // Le timestamp d'ancrage dans le mois traité, il est en seconde donc /1000
  tms:number;

  // Une valeur qui contient la date actuelle pour se servir de 'moment'
  date:Date;

  // Ici les timestamp qui sont les limites du range mensuel
  //tmsBegin:number;
  //tmsEnd:number;

  // Valeur string à afficher
  actualMonth:String;

  constructor(
    private fb:FormBuilder,
    private _eventsService:EventsService,
    private router:Router,
    private _loginService:LoginService,
    private http:HttpClient
  ) {
    this.eventsService=_eventsService;
    this.loginService = _loginService;

    this.mois = 0;
    this.date = new Date(moment().format());

    // on récupère le tms
    this.tms = Math.floor(Date.now()/1000);

    // Le mois qui sera affiché
    this.actualMonth = moment().format('MMMM');

    this.refreshEvents();
  }


  ngOnInit():void {
    this.eventsService.getEventsByMonthAndUserId(this.tms,this.idForPlanning).subscribe(
      (response)=>{
        this.eventsList = response;
      }
    )
  }

  del(id:number){
    this.eventsService.deleteEvent(id).subscribe(
      ()=>{
        this.refreshEvents();
      }
    );
  }

  refreshEvents(){
    this.ngOnInit();
  }

  nextMonth(){
    this.mois+=1;
    this.date = moment(this.date).add(1,"month").toDate();
    this.tms = Math.floor(this.date.getTime()/1000);
    this.actualMonth = moment(this.date).format('MMMM');
    this.refreshEvents();
  }

  previousMonth(){
    this.mois-=1;
    this.date = moment(this.date).add(-1,"month").toDate();
    this.tms=Math.floor(this.date.getTime()/1000);
    this.actualMonth = moment(this.date).format('MMMM');
    this.refreshEvents();
  }

  editer(event:Events){
    this.router.navigate(['event/'+event.id]);
  }

  reset(){
    this.mois=0;
    this.tms=Math.floor(Date.now()/1000);
    this.date= new Date(moment().format());
    this.actualMonth = moment(this.date).format('MMMM');
    this.refreshEvents();
  }



  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

  sendMail(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/meqderdk',
      { name: this.loginService.userLogged?.firstName, replyto: this.loginService.userLogged?.email, message: this.eventsList },
      { 'headers': headers }).subscribe(
      response => {
        console.log(response);
      }
    );
  }



}
