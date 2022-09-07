import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DateManipulation{

  prepareDateString(day:Date):string{

    let dayString:string = this.getDayToString(day.getDay());
    let dateInt:string = day.getDate().toString();
    let month:string = this.getMonthToString(day.getMonth());
    return dayString+" "+dateInt+" "+month;
  }
  datetimeToDate(dateToClear:Date):Date{
    dateToClear.setMilliseconds(0);
    dateToClear.setSeconds(0);
    dateToClear.setMinutes(0);
    dateToClear.setHours(0);
    return dateToClear;
  }

  getDayToString(day:number):string{

    let s:string = "";
    switch(day){
      case 0: // sunday
        s = "Dimanche";
        break;
      case 1: // monday
        s = "Lundi";
        break;
      case 2: // tuesday
        s = "Mardi";
        break;
      case 3: // wednesday
        s = "Mercredi";
        break;
      case 4: // thursday
        s = "Jeudi";
        break;
      case 5: // friday
        s = "Vendredi";
        break;
      case 6: // saturday
        s = "Samedi";
        break;
      default:
        break;
    }
    return s;
  }

  getMonthToString(month:number):string{

    let s:string = "";
    switch(month){
      case 0: // january
        s = "Janvier";
        break;
      case 1: // february
        s = "Février";
        break;
      case 2: // march
        s = "Mars";
        break;
      case 3: // april
        s = "Avril";
        break;
      case 4: // may
        s = "Mai";
        break;
      case 5: // june
        s = "Juin";
        break;
      case 6: // july
        s = "Juillet";
        break;
      case 7: // august
        s = "Août";
        break;
      case 8: // september
        s = "Septembre";
        break;
      case 9: // october
        s = "Octobre";
        break;
      case 10: // november
        s = "Novembre";
        break;
      case 11: // december
        s = "Décembre";
        break;
      default:
        break;
    }
    return s;
  }

  findActualMondayFromTms(tms:number):Date{
    let actualDate:Date = new Date(tms*1000);
    let day:number=actualDate.getDay();
    switch(day){
      case 0: // sunday
        actualDate = moment(actualDate).add(-6,"day").toDate();
        break;
      case 1: // monday
        actualDate = moment(actualDate).add(0,"day").toDate();
        break;
      case 2: // tuesday
        actualDate = moment(actualDate).add(-1,"day").toDate();
        break;
      case 3: // wednesday
        actualDate = moment(actualDate).add(-2,"day").toDate();
        break;
      case 4: // thursday
        actualDate = moment(actualDate).add(-3,"day").toDate();
        break;
      case 5: // friday
        actualDate = moment(actualDate).add(-4,"day").toDate();
        break;
      case 6: // saturday
        actualDate = moment(actualDate).add(-5,"day").toDate();
        break;
      default:
        break;
    }
    // On s'assure d'avoir une date sans time
    actualDate = this.datetimeToDate(actualDate);
    return actualDate;
  }

  findNextMonday(lundiActuel:Date):Date{

    let lundiProchain = moment(lundiActuel).add(7,"days").toDate();
    return lundiProchain;
  }

  findLastMonday(lundiActuel:Date):Date{

    let lundiDernier = moment(lundiActuel).add(-7,"days").toDate();
    return lundiDernier;
  }

}
