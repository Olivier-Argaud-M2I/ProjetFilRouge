import { CalendarPrivilege } from "./Calendar_Privilege";
import { User } from "./User";

export class Contact{


    private _id!: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    private _user!: User;
    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }

    private _collaborator!: User;
    public get collaborator(): User {
        return this._collaborator;
    }
    public set collaborator(value: User) {
        this._collaborator = value;
    }

    private _calendarPrivileges!: CalendarPrivilege[];
    public get calendarPrivileges(): CalendarPrivilege[] {
        return this._calendarPrivileges;
    }
    public set calendarPrivileges(value: CalendarPrivilege[]) {
        this._calendarPrivileges = value;
    }


    public constructor(init?: Partial<Contact>) {
        Object.assign(this, init);
    }



}
