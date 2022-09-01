import { Component, Input, OnInit } from '@angular/core';
import { MeteoService } from '../service/meteo.service'
import { Forecast } from '../model/forecast';
import { Meteo } from '../model/meteo';

@Component({
  selector: 'app-meteo-detail',
  templateUrl: './meteo-detail.component.html',
  styleUrls: ['./meteo-detail.component.css']
})
export class MeteoDetailComponent implements OnInit {

  // @Input() villeDemandee!:string;

  @Input() donnee:any;

  // ville!:string;
  // temperature!:number;
  // condition!:string;
  // icon!:string;
  // reponse:any;
  toggle:boolean=false;

  meteoService!:MeteoService;

  forecasts:any[]=[];

  constructor(private _meteoService:MeteoService) {
    this.meteoService = _meteoService;
  }

  ngOnInit(): void {
    // this.appelMeteo(this.villeDemandee);

    // this.reponse = this.donnee;

    this.forecasts.push(this.donnee.fcst_day_0 as Forecast);
    this.forecasts.push(this.donnee.fcst_day_1 as Forecast);
    this.forecasts.push(this.donnee.fcst_day_2 as Forecast);
    this.forecasts.push(this.donnee.fcst_day_3 as Forecast);
    this.forecasts.push(this.donnee.fcst_day_4 as Forecast);
  }

  // appelMeteo(ville:string){
  //   this._meteoService.getMeteoVille(ville).subscribe((response)=>{
  //     console.log(response);
  //     this.reponse = response;
  //     // this.ville = response.city_info.name;
  //     // this.temperature = response.current_condition.tmp;
  //     // this.condition = response.current_condition.humidity;
  //     // this.icon = response.current_condition.icon;

  //     this.forecasts.push(response.fcst_day_0);
  //     this.forecasts.push(response.fcst_day_1);
  //     this.forecasts.push(response.fcst_day_2);
  //     this.forecasts.push(response.fcst_day_3);
  //     this.forecasts.push(response.fcst_day_4);

  //     // this.testForecast.forEach((forecast)=>{
  //     //   console.log(forecast);
  //     // })
  //     // // for (let i = 0; i < 4; i++) {
  //     // //   this.forecasts.push(new Forecast())

  //     // //  }

  //   });
  // }

  detailMeteo(ville:string){
    console.log(ville);
    this.toggle = !this.toggle;

  }


  supprimer(){
    this.meteoService.removeVille(this.donnee);
  }

}

