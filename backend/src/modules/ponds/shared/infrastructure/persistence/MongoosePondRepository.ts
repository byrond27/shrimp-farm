import { PondRepository } from '../../../domain/repository/PondRepository'

import { Pond } from '../../../domain/Pond'
// @ts-ignore
const PondSchema = require('./models/Pond')

export class MongoosePondRepository implements PondRepository {
  createPond(pond: Pond): Pond | any {
    try {
      const savePond = new PondSchema({
        id: pond.id,
        farmID: pond.farmID,
        name: pond.name,
        size: pond.size,
      })
      savePond.save().catch((err: any) => {
        console.log(err)
      })
      return pond
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async editPondById(data: any): Promise<any> {
    try {
      const filter = { id: data.id }
      const update = {
        name: data.name,
        size: data.size,
      }
      let result = await PondSchema.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      })

      return new Pond(result.id, result.farmID, result.name, result.size)
    } catch (err) {
      console.log(err)
    }
  }

  async deletePondById(id: String): Promise<any> {
    try {
      const results = await PondSchema.deleteOne({ id: id })
      return results
    } catch (err) {
      console.log(err)
    }
  }

  async getPonds(): Promise<any> {
    try {
      const results = await PondSchema.find({})
      return results
    } catch (err) {
      console.log(err)
    }
  }

  async getPondById(id: string): Promise<any> {
    try {
      const result = await PondSchema.findOne({ id: id })
      return new Pond(result.id, result.farmID, result.name, result.size)
    } catch (err) {
      console.log(err)
    }
  }

  async deletePondsByFarmID(id: string): Promise<any> {
    try {
      const result = await PondSchema.deleteMany({ farmID: id })
      return result
    } catch (err) {
      console.log(err)
    }
  }
}
