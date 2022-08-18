import { Privilege } from "./Privilege";
import { Role } from "./Role";

export class User{

    private _id!: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    private _username: string="";
    public get userName(): string {
        return this._username;
    }
    public set userName(value: string) {
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
    public get firstName(): string {
        return this._firstname;
    }
    public set firstName(value: string) {
        this._firstname = value;
    }

    private _lastname: string = "";
    public get lastName(): string {
        return this._lastname;
    }
    public set lastName(value: string) {
        this._lastname = value;
    }

    private _privileges: Privilege[] = [];
    public get privileges(): Privilege[] {
        return this._privileges;
    }
    public set privileges(value: Privilege[]) {
        this._privileges = value;
    }

    private _role!: Role;
    public get role(): Role {
        return this._role;
    }
    public set role(value: Role) {
        this._role = value;
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