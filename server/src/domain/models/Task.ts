export class Task {
  // private _id: string;
  private _title: string;

  // get id(): string {
  //   return this._id;
  // }

  // set id(id: string) {
  //   this._id = id;
  // }

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  constructor(title: string) {
    this._title = title;
  }
}
