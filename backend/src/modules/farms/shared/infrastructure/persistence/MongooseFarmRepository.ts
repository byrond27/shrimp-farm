import { FarmRepository } from '../../../domain/repository/FarmRepository'
import { Farm } from '../../../domain/Farm'
// @ts-ignore
const FarmSchema = require('./models/Farm')

export class MongooseFarmRepository implements FarmRepository {
  createFarm(farm: Farm): Farm | any {
    try {
      const saveFarm = new FarmSchema({
        id: farm.id,
        name: farm.name,
        total_size: farm.totalSize,
      })
      saveFarm.save().catch((err: any) => {
        console.log(err)
      })
      return farm
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async editFarmById(data: any): Promise<any> {
    try {
      console.log(data)
      const filter = { id: data.id }
      const update = {
        name: data.name,
        total_size: data.totalSize,
      }
      let result = await FarmSchema.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      })
      return new Farm(result.id, result.name, result.total_size)
    } catch (err) {
      console.log(err)
    }
  }
}
