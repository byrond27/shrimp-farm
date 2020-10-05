import { Pond } from '../Pond'

export interface PondRepository {
  getPonds(): Promise<any>
  createPond(pond: Pond): Pond
  editPondById(data: any): Promise<any>
  deletePondById(id: string): Promise<any>
  getPondById(id: string): Promise<any>
  deletePondsByFarmID(id: string): Promise<any>
}
