import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { PondRepository } from '../../domain/repository/PondRepository'
import { FarmRepository } from '../../../farms/domain/repository/FarmRepository'
import { Pond } from '../../domain/Pond'
import { Farm } from '../../../farms/domain/Farm'
import { MongoosePondRepository } from '../../shared/infrastructure/persistence/MongoosePondRepository'
import { MongooseFarmRepository } from '../../../farms/shared/infrastructure/persistence/MongooseFarmRepository'
// @ts-ignore
const validation = require('./validation/editPondValidation')

@injectable()
export class EditPond {
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

    const newPond = new Pond(
      req.body.id,
      req.body.farmID,
      req.body.name,
      req.body.size
    )

    const currentPond = await this.pondRepository.getPondById(newPond.id)

    const currentFarm = await this.farmRepository.getFarmByID(req.body.farmID)

    const newFarmSize =
      Number(currentFarm.totalSize) -
      Number(currentPond.size) +
      Number(newPond.size)

    const farm = new Farm(currentFarm.id, currentFarm.name, newFarmSize)

    await this.farmRepository.editFarmById(farm)

    const editPond = await this.pondRepository.editPondById(newPond)

    return res.status(200).json(editPond)
  }
}
