import { Farm } from '../../../../../../src/modules/farms/domain/Farm'
const faker = require('faker')

faker.locale = 'es'

let farm: Farm
let data: any = {
  name: faker.name.findName(),
  total_size: 0,
}

beforeEach(() => {
  farm = Farm.create(data.name)
})

describe('Domain Farm', () => {
  it('should be able to create a farm', async () => {
    expect(farm.name).toEqual(data.name)
  })
  it('should create a farm with size 0', async () => {
    expect(farm.totalSize).toEqual(data.total_size)
  })
})
