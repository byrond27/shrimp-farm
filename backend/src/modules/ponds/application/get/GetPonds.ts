import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { PondRepository } from '../../domain/repository/PondRepository'
import { MongoosePondRepository } from '../../shared/infrastructure/persistence/MongoosePondRepository'

@injectable()
export class GetPonds {
  protected pondRepository: PondRepository

  constructor(@inject(MongoosePondRepository) pondRepository: PondRepository) {
    this.pondRepository = pondRepository
  }

  async execute(req: any, res: any) {
    const ponds: any = await this.pondRepository.getPonds()
    await res.json(ponds)
  }
}
