import { Farm } from '../Farm'

export interface FarmRepository {
  createFarm(farm: Farm): Farm
}
