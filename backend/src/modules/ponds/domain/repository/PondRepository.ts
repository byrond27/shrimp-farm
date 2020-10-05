import { Pond } from '../Pond'

export interface PondRepository {
  createPond(pond: Pond): Pond
  editPondById(data: any): Promise<any>
  deletePondById(id: string): Promise<any>
  getPonds(): Promise<any>
  getPondById(id: string): Promise<any>
  deletePondsByFarmID(id: string): Promise<any>
}
