// @ts-ignore
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { PondRepository } from '../../domain/repository/PondRepository'
import { FarmRepository } from '../../../farms/domain/repository/FarmRepository'
import { Pond } from '../../domain/Pond'
import { MongoosePondRepository } from '../../shared/infrastructure/persistence/MongoosePondRepository'
import { MongooseFarmRepository } from '../../../farms/shared/infrastructure/persistence/MongooseFarmRepository'
// @ts-ignore
const validation = require('./validation/CreatePondValidation')

@injectable()
export class CreatePond {
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

    const newPond: Pond = Pond.create(
      req.body.farmID,
      req.body.name,
      req.body.size
    )

    await res.json(this.pondRepository.createPond(newPond))
  }
}
