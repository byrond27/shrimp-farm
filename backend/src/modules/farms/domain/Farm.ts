import { v4 as uuid } from 'uuid'

export class Farm {
  private _id: string
  private _name: string
  private _farm_size: number

  constructor(id: string, name: string, farm_size: number) {
    this._id = id
    this._name = name
    this._farm_size = farm_size
  }

  public static create(name: string): Farm | any {
    const id: string = uuid()
    const farm_size: number = 0
    return new Farm(id, name, farm_size)
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get farm_size(): number {
    return this._farm_size
  }
}
