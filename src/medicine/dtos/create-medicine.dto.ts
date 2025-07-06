import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export type CreateMedicineUseCaseInput = Pick<MedicineEntity, 'name'>

export type CreateMedicineUseCaseOutput = Pick<MedicineEntity, 'id' | 'name'>
