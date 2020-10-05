import { Farm } from '../Farm'

export interface FarmRepository {
  getFarms(): Promise<any>
  createFarm(farm: Farm): Farm
  editFarmById(data: any): Promise<any>
  deleteFarmById(id: string): Promise<any>
  getFarmByID(id: string): Promise<any>
}
