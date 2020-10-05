import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { PondRepository } from '../../domain/repository/PondRepository'
import { Pond } from '../../domain/Pond'
import { MongoosePondRepository } from '../../shared/infrastructure/persistence/MongoosePondRepository'
// @ts-ignore
const validation = require('./validation/editPondValidation')

@injectable()
export class EditPond {
  protected pondRepository: PondRepository

  constructor(@inject(MongoosePondRepository) pondRepository: PondRepository) {
    this.pondRepository = pondRepository
  }

  async execute(req: any, res: any) {
    const { errors, isValid } = validation(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const newPond = new Pond(req.body.id, req.body.name, req.body.size)
    const editPond = await this.pondRepository.editPondById(newPond)
    return res.status(200).json(editPond)
  }
}
