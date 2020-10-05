// @ts-ignore
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { PondRepository } from '../../domain/repository/PondRepository'
import { MongoosePondRepository } from '../../shared/infrastructure/persistence/MongoosePondRepository'
// @ts-ignore
const validation = require('./validation/deletePondValidation')

@injectable()
export class DeletePond {
  protected PondRepository: PondRepository

  constructor(@inject(MongoosePondRepository) PondRepository: PondRepository) {
    this.PondRepository = PondRepository
  }

  async execute(req: any, res: any) {
    const { errors, isValid } = validation(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    await this.PondRepository.deletePondById(req.body.id)
    return res.status(200).json('Pond Deleted')
  }
}
