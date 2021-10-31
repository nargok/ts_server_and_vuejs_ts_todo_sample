export class Task {
  private _uuid!: string;
  private _title: string;
  private _createdAt!: string;
  private _updatedAt!: string;

  get uuid(): string {
    return this._uuid;
  }

  set uuid(uuid: string) {
    this._uuid = uuid;
  }

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get cretedAt(): string {
    return this._createdAt;
  }

  set cretedAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  get updatedAt(): string {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: string) {
    this._updatedAt = updatedAt;
  }

  constructor(title: string) {
    this._title = title;
  }
}
