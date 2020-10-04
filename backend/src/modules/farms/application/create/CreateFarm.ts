// @ts-ignore
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { FarmRepository } from '../../domain/repository/FarmRepository'
import { Farm } from '../../domain/Farm'
import { MongooseFarmRepository } from '../../shared/infrastructure/persistence/MongooseFarmRepository'
// @ts-ignore
const validation = require('./validation/CreateFarmValidation')

@injectable()
export class CreateFarm {
  protected farmRepository: FarmRepository

  constructor(@inject(MongooseFarmRepository) farmRepository: FarmRepository) {
    this.farmRepository = farmRepository
  }

  async execute(req: any, res: any) {
    const { errors, isValid } = validation(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const newFarm: Farm = Farm.create(req.body.name)
    await res.json(this.farmRepository.createFarm(newFarm))
  }
}
