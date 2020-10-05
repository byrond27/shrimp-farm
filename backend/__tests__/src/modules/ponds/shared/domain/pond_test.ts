import { Pond } from '../../../../../../src/modules/ponds/domain/Pond'
import { v4 as uuid } from 'uuid'

const faker = require('faker')

faker.locale = 'es'

let pond: Pond
let data: any = {
  name: faker.name.findName(),
  farmID: uuid(),
  size: faker.random.number(),
}

beforeEach(() => {
  pond = Pond.create(data.farmID, data.name, data.size)
})

describe('Domain Pond', () => {
  it('should be able to create a pond with FarmID', async () => {
    expect(pond.farmID).toEqual(data.farmID)
  })
  it('should be able to create a pond with Name', async () => {
    expect(pond.name).toEqual(data.name)
  })
  it('should create a pond with size random size', async () => {
    expect(pond.size).toEqual(data.size)
  })
})
