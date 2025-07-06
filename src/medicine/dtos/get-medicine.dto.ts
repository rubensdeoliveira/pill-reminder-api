import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export type GetMedicineUseCaseInput = {
  id: string
}

export type GetMedicineUseCaseOutput = Pick<MedicineEntity, 'id' | 'name'>
