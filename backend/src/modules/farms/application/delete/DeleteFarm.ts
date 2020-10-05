// @ts-ignore
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { FarmRepository } from '../../domain/repository/FarmRepository'
import { PondRepository } from '../../../ponds/domain/repository/PondRepository'
import { MongooseFarmRepository } from '../../shared/infrastructure/persistence/MongooseFarmRepository'
import { MongoosePondRepository } from '../../../ponds/shared/infrastructure/persistence/MongoosePondRepository'

// @ts-ignore
const validation = require('./validation/deleteFarmValidation')

@injectable()
export class DeleteFarm {
  protected FarmRepository: FarmRepository
  protected PondRepository: PondRepository

  constructor(
    @inject(MongooseFarmRepository) FarmRepository: FarmRepository,
    @inject(MongoosePondRepository) pondRepository: PondRepository
  ) {
    this.FarmRepository = FarmRepository
    this.PondRepository = pondRepository
  }

  async execute(req: any, res: any) {
    const { errors, isValid } = validation(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    await this.FarmRepository.deleteFarmById(req.body.id)
    await this.PondRepository.deletePondsByFarmID(req.body.id)

    return res.status(200).json('Farm Deleted')
  }
}
