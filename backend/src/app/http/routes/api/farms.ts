import express from 'express'
import 'reflect-metadata'
import { MongooseFarmRepository } from '../../../../modules/farms/shared/infrastructure/persistence/MongooseFarmRepository'
import { CreateFarm } from '../../../../modules/farms/application/create/CreateFarm'
import { EditFarm } from '../../../../modules/farms/application/edit/EditFarm'

const router = express.Router()

router.post('/create', (req: any, res: any) => {
  const createFarm = new CreateFarm(new MongooseFarmRepository())
  return createFarm.execute(req, res)
})

router.put('/edit', (req: any, res: any) => {
  const editStore = new EditFarm(new MongooseFarmRepository())
  return editStore.execute(req, res)
})

module.exports = router
