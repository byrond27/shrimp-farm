import express from 'express'
import 'reflect-metadata'
import { MongoosePondRepository } from '../../../../modules/ponds/shared/infrastructure/persistence/MongoosePondRepository'
import { MongooseFarmRepository } from '../../../../modules/farms/shared/infrastructure/persistence/MongooseFarmRepository'
import { CreatePond } from '../../../../modules/ponds/application/create/CreatePond'
import { EditPond } from '../../../../modules/ponds/application/edit/EditPond'
import { DeletePond } from '../../../../modules/ponds/application/delete/DeletePond'
import { GetPonds } from '../../../../modules/ponds/application/get/GetPonds'

const router = express.Router()

router.get('/', (req: any, res: any) => {
  const getPond = new GetPonds(new MongoosePondRepository())
  return getPond.execute(req, res)
})

router.post('/', (req: any, res: any) => {
  const createPond = new CreatePond(
    new MongoosePondRepository(),
    new MongooseFarmRepository()
  )
  return createPond.execute(req, res)
})

router.put('/', (req: any, res: any) => {
  const editStore = new EditPond(
    new MongoosePondRepository(),
    new MongooseFarmRepository()
  )
  return editStore.execute(req, res)
})

router.delete('/', (req: any, res: any) => {
  const deletePond = new DeletePond(
    new MongoosePondRepository(),
    new MongooseFarmRepository()
  )
  return deletePond.execute(req, res)
})

module.exports = router
