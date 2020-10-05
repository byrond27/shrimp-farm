import { v4 as uuid } from 'uuid'

export class Farm {
  private _id: string
  private _name: string
  private _total_size: number

  constructor(id: string, name: string, total_size: number) {
    this._id = id
    this._name = name
    this._total_size = total_size
  }

  public static create(name: string): Farm | any {
    const id: string = uuid()
    const total_size: number = 0
    return new Farm(id, name, total_size)
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get totalSize(): number {
    return this._total_size
  }
}
