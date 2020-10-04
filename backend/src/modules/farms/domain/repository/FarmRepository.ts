import { Farm } from '../Farm'

export interface FarmRepository {
  createFarm(farm: Farm): Farm
  editFarmById(data: any): Promise<any>
  deleteFarmById(id: string): Promise<any>
}
