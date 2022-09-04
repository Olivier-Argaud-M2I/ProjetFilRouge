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

    private _email!: string;
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    private _telephone!: string;
    public get telephone(): string {
        return this._telephone;
    }
    public set telephone(value: string) {
        this._telephone = value;
    }

    private _role!: Role;
    public get role(): Role {
        return this._role;
    }
    public set role(value: Role) {
        this._role = value;
    }

    // private _collaborators: User[] = [];
    // public get collaborators(): User[] {
    //     return this._collaborators;
    // }
    // public set collaborators(value: User[]) {
    //     this._collaborators = value;
    // }



    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }


    toString(){
        return this._username + " : "+this._firstname+" "+this._lastname;
    }

}
