// @ts-ignore
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { FarmRepository } from '../../domain/repository/FarmRepository'
import { MongooseFarmRepository } from '../../shared/infrastructure/persistence/MongooseFarmRepository'
// @ts-ignore
const validation = require('./validation/deleteFarmValidation')

@injectable()
export class DeleteFarm {
  protected FarmRepository: FarmRepository

  constructor(@inject(MongooseFarmRepository) FarmRepository: FarmRepository) {
    this.FarmRepository = FarmRepository
  }

  async execute(req: any, res: any) {
    const { errors, isValid } = validation(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    await this.FarmRepository.deleteFarmById(req.body.id)
    return res.status(200).json('Farm Deleted')
  }
}
