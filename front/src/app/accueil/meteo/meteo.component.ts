import { Component, OnInit } from '@angular/core';
import { Meteo } from './model/meteo';
import { MeteoService } from './service/meteo.service';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  meteoService!:MeteoService;

  constructor(private _meteoService:MeteoService) {
    this.meteoService = _meteoService
  }


  ngOnInit(): void {
  }

  appelMeteo(ville:string){
    this.meteoService.getMeteoVille(ville).subscribe((response )=>{
      let idInputVille = document.getElementById('idInputVille') as HTMLInputElement;
      // test si l'api nous renvoie une reponse valide
      if(response.fcst_day_0 != undefined || response.fcst_day_0 != null){
        // on stock la reponse valide de meteo dans le service
        this.meteoService.addVille(response as Meteo);
        idInputVille.setAttribute('class','');
        idInputVille.setAttribute('placeholder','Saisissez le nom de votre ville');
      }
      else{
        idInputVille.setAttribute('class','red');
        idInputVille.setAttribute('placeholder','Ville non reconnue');
      }
    });
  }


  supprimer(ville:Meteo){
    this.meteoService.removeVille(ville);
  }

}
