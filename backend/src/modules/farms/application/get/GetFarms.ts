import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { FarmRepository } from '../../domain/repository/FarmRepository'
import { MongooseFarmRepository } from '../../shared/infrastructure/persistence/MongooseFarmRepository'

@injectable()
export class GetFarms {
  protected farmRepository: FarmRepository

  constructor(@inject(MongooseFarmRepository) farmRepository: FarmRepository) {
    this.farmRepository = farmRepository
  }

  async execute(req: any, res: any) {
    const farms: any = await this.farmRepository.getFarms()
    await res.json(farms)
  }
}
