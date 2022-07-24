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

    private _firstname: string = "";
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }

    private _lastname: string = "";
    public get lastname(): string {
        return this._lastname;
    }
    public set lastname(value: string) {
        this._lastname = value;
    }

    private _roles: String[] = [];
    public get roles(): String[] {
        return this._roles;
    }
    public set roles(value: String[]) {
        this._roles = value;
    }

    // constructor(username:string,password:string,firstname:String,lastname:String,roles:String[]){
    constructor(username:string,password:string){
        this._username = username;
        this._password = password;
    }

    toString(){
        return this._username + " : "+this._firstname+" "+this._lastname;
    }

}