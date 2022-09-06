export class Events{

  private _id!:number;

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

  private _description: string = "";
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  private _user_id:number = 0;
  get user_id(): number {
    return this._user_id;
  }

  set user_id(value: number) {
    this._user_id = value;
  }

  private _date_debut_timestamp:number = 0;

  get date_debut_timestamp(): number {
    return this._date_debut_timestamp;
  }

  set date_debut_timestamp(value: number) {
    this._date_debut_timestamp = value;
  }

  private _date_fin_timestamp:number = 0;
  get date_fin_timestamp(): number {
    return this._date_fin_timestamp;
  }

  set date_fin_timestamp(value: number) {
    this._date_fin_timestamp = value;
  }

  public constructor(init?: Partial<Events>) {
    Object.assign(this, init);
  }

}
