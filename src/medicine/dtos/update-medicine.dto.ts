import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export type UpdateMedicineUseCaseInput = Pick<MedicineEntity, 'id' | 'name'>

export type UpdateMedicineUseCaseOutput = Pick<MedicineEntity, 'id' | 'name'>
