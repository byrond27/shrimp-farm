// @ts-ignore
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { PondRepository } from '../../domain/repository/PondRepository'
import { FarmRepository } from '../../../farms/domain/repository/FarmRepository'
import { Farm } from '../../../farms/domain/Farm'
import { MongoosePondRepository } from '../../shared/infrastructure/persistence/MongoosePondRepository'
import { MongooseFarmRepository } from '../../../farms/shared/infrastructure/persistence/MongooseFarmRepository'
// @ts-ignore
const validation = require('./validation/deletePondValidation')

@injectable()
export class DeletePond {
  protected pondRepository: PondRepository
  protected farmRepository: FarmRepository

  constructor(
    @inject(MongoosePondRepository) pondRepository: PondRepository,
    @inject(MongooseFarmRepository) farmRepository: FarmRepository
  ) {
    this.pondRepository = pondRepository
    this.farmRepository = farmRepository
  }

  async execute(req: any, res: any) {
    const { errors, isValid } = validation(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const currentPond = await this.pondRepository.getPondById(req.body.id)

    const currentFarm = await this.farmRepository.getFarmByID(
      currentPond.farmID
    )

    if (currentFarm !== undefined) {
      const farm = new Farm(
        currentFarm.id,
        currentFarm.name,
        Number(currentFarm.totalSize) - Number(currentPond.size)
      )
      await this.farmRepository.editFarmById(farm)
    }

    await this.pondRepository.deletePondById(req.body.id)
    return res.status(200).json('Pond Deleted')
  }
}
