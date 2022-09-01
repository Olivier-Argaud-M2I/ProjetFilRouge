export class CalendarPrivilege{


    private _id!: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }


    private _name: string = "";
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    constructor(name:string){
        this._name = name;
    }


    private _status: boolean = false;
    public get status(): boolean {
        return this._status;
    }
    public set status(value: boolean) {
        this._status = value;
    }



}
