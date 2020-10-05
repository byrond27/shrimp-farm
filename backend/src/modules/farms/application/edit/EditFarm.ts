import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { FarmRepository } from '../../domain/repository/FarmRepository'
import { Farm } from '../../domain/Farm'
import { MongooseFarmRepository } from '../../shared/infrastructure/persistence/MongooseFarmRepository'
// @ts-ignore
const validation = require('./validation/editFarmValidation')

@injectable()
export class EditFarm {
  protected farmRepository: FarmRepository

  constructor(@inject(MongooseFarmRepository) farmRepository: FarmRepository) {
    this.farmRepository = farmRepository
  }

  async execute(req: any, res: any) {
    const { errors, isValid } = validation(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const newFarm = new Farm(req.body.id, req.body.name, req.body.size)
    const editFarm = await this.farmRepository.editFarmById(newFarm)

    return res.status(200).json(editFarm)
  }
}
