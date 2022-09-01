import { CityInfo } from "./cityInfo";
import { CurrentCondition } from "./currentCondition";
import { Forecast } from "./forecast";

export class Meteo{


    private _city_info!: CityInfo;
    public get city_info(): CityInfo {
        return this._city_info;
    }
    public set city_info(value: CityInfo) {
        this._city_info = value;
    }
    private _current_condition!: CurrentCondition;
    public get current_condition(): CurrentCondition {
        return this._current_condition;
    }
    public set current_condition(value: CurrentCondition) {
        this._current_condition = value;
    }
    private _fcst_day_0!: Forecast;
    public get fcst_day_0(): Forecast {
        return this._fcst_day_0;
    }
    public set fcst_day_0(value: Forecast) {
        this._fcst_day_0 = value;
    }
    private _fcst_day_1!: Forecast;
    public get fcst_day_1(): Forecast {
        return this._fcst_day_1;
    }
    public set fcst_day_1(value: Forecast) {
        this._fcst_day_1 = value;
    }
    private _fcst_day_2!: Forecast;
    public get fcst_day_2(): Forecast {
        return this._fcst_day_2;
    }
    public set fcst_day_2(value: Forecast) {
        this._fcst_day_2 = value;
    }
    private _fcst_day_3!: Forecast;
    public get fcst_day_3(): Forecast {
        return this._fcst_day_3;
    }
    public set fcst_day_3(value: Forecast) {
        this._fcst_day_3 = value;
    }
    private _fcst_day_4!: Forecast;
    public get fcst_day_4(): Forecast {
        return this._fcst_day_4;
    }
    public set fcst_day_4(value: Forecast) {
        this._fcst_day_4 = value;
    }


    constructor() {

    }

}
