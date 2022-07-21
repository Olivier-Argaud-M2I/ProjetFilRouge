import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil-collab',
  templateUrl: './accueil-collab.component.html',
  styleUrls: ['./accueil-collab.component.css']
})
export class AccueilCollabComponent implements OnInit {

  router:Router

  constructor(private _router:Router) {
    this.router = _router;
   }

  ngOnInit(): void {
  }


  goPlanning(){
    this.router.navigate(['planning'])
  }
}
