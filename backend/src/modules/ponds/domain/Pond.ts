import { v4 as uuid } from 'uuid'

export class Pond {
  private _id: string
  private _farmID: string
  private _name: string
  private _size: number

  constructor(id: string, farmID: string, name: string, size: number) {
    this._id = id
    this._farmID = farmID
    this._name = name
    this._size = size
  }

  public static create(farmID: string, name: string, size: number): Pond | any {
    const id: string = uuid()
    return new Pond(id, farmID, name, size)
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get size(): number {
    return this._size
  }

  get farmID(): string {
    return this._farmID
  }
}
