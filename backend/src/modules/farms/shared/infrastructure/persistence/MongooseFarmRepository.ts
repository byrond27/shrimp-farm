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
        farm_size: farm.farm_size,
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
}
