export class Forecast{



    private _day_long: string = "";
    public get day_long(): string {
        return this._day_long;
    }
    public set day_long(value: string) {
        this._day_long = value;
    }

    private _date: string = "";
    public get date(): string {
        return this._date;
    }
    public set date(value: string) {
        this._date = value;
    }

    private _tmin: string = "";
    public get tmin(): string {
        return this._tmin;
    }
    public set tmin(value: string) {
        this._tmin = value;
    }

    private _tmax: string = "";
    public get tmax(): string {
        return this._tmax;
    }
    public set tmax(value: string) {
        this._tmax = value;
    }

    private _condition: string = "";
    public get condition(): string {
        return this._condition;
    }
    public set condition(value: string) {
        this._condition = value;
    }

    private _icon: string = "";
    public get icon(): string {
        return this._icon;
    }
    public set icon(value: string) {
        this._icon = value;
    }


    constructor(day_long:string,date:string,tmin:string,tmax:string,condition:string,icon:string){
        this._day_long = day_long;
        this._date = date;
        this._tmin = tmin;
        this._tmax = tmax;
        this._condition = condition;
        this._icon = icon;
    }

}
