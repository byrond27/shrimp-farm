import express from 'express'
import 'reflect-metadata'
import { MongooseFarmRepository } from '../../../../modules/farms/shared/infrastructure/persistence/MongooseFarmRepository'
import { CreateFarm } from '../../../../modules/farms/application/create/CreateFarm'

const router = express.Router()

router.post('/create', (req: any, res: any) => {
  const createFarm = new CreateFarm(new MongooseFarmRepository())
  return createFarm.execute(req, res)
})

module.exports = router
