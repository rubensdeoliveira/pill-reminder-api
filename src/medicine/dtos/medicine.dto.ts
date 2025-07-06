import { MedicineEntity } from '../entities/medicine.entity'

export type MedicineOutput = Pick<MedicineEntity, 'id' | 'name'>
