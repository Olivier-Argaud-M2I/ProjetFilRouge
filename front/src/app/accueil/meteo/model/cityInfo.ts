export class CityInfo{

    private _name: string = "";
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _country: string = "";
    public get country(): string {
        return this._country;
    }
    public set country(value: string) {
        this._country = value;
    }
    private _latitude: string = "";
    public get latitude(): string {
        return this._latitude;
    }
    public set latitude(value: string) {
        this._latitude = value;
    }
    private _longitude: string = "";
    public get longitude(): string {
        return this._longitude;
    }
    public set longitude(value: string) {
        this._longitude = value;
    }
    private _elevation: string = "";
    public get elevation(): string {
        return this._elevation;
    }
    public set elevation(value: string) {
        this._elevation = value;
    }
    private _sunrise: string = "";
    public get sunrise(): string {
        return this._sunrise;
    }
    public set sunrise(value: string) {
        this._sunrise = value;
    }
    private _sunset: string = "";
    public get sunset(): string {
        return this._sunset;
    }
    public set sunset(value: string) {
        this._sunset = value;
    }


    constructor(){

    }

}
