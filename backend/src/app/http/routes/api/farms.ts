import express from 'express'
import 'reflect-metadata'
import { MongooseFarmRepository } from '../../../../modules/farms/shared/infrastructure/persistence/MongooseFarmRepository'
import { MongoosePondRepository } from '../../../../modules/ponds/shared/infrastructure/persistence/MongoosePondRepository'
import { GetFarms } from '../../../../modules/farms/application/get/GetFarms'
import { CreateFarm } from '../../../../modules/farms/application/create/CreateFarm'
import { EditFarm } from '../../../../modules/farms/application/edit/EditFarm'
import { DeleteFarm } from '../../../../modules/farms/application/delete/DeleteFarm'

const router = express.Router()

router.get('/', (req: any, res: any) => {
  const getFarm = new GetFarms(new MongooseFarmRepository())
  return getFarm.execute(req, res)
})

router.post('/', (req: any, res: any) => {
  const createFarm = new CreateFarm(new MongooseFarmRepository())
  return createFarm.execute(req, res)
})

router.put('/', (req: any, res: any) => {
  const editStore = new EditFarm(new MongooseFarmRepository())
  return editStore.execute(req, res)
})

router.delete('/', (req: any, res: any) => {
  const deleteFarm = new DeleteFarm(
    new MongooseFarmRepository(),
    new MongoosePondRepository()
  )
  return deleteFarm.execute(req, res)
})

module.exports = router
