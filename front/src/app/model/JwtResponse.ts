import { User } from "./User";


export class JwtResponse{

   
    private _user!: User;
    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
    
    private _jwToken!: string;
    public get jwToken(): string {
        return this._jwToken;
    }
    public set jwToken(value: string) {
        this._jwToken = value;
    }


    public constructor(init?: Partial<JwtResponse>) {
        Object.assign(this, init);
    }




}
