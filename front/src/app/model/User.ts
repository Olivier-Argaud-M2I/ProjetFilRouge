export class User{

    private _username: string="";
    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }
    private _password: string="";
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    constructor(username:string,password:string){
        this._username = username;
        this._password = password;
    }

    toString(){
        return this._username+" "+this._password;
    }

}