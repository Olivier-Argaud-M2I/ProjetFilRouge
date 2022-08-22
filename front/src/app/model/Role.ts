import { Privilege } from "./Privilege";

export class Role{


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

    private _privileges: Privilege[] = [];
    public get privileges(): Privilege[] {
        return this._privileges;
    }
    public set privileges(value: Privilege[]) {
        this._privileges = value;
    }


    public constructor(init?: Partial<Role>) {
        Object.assign(this, init);
    }

    // constructor(name:string){
    //     this._name = name;
    // }


}