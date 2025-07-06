import { MedicineOutput } from '@/medicine/dtos/medicine.dto'
import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export type UpdateMedicineUseCaseInput = Pick<MedicineEntity, 'id' | 'name'>

export type UpdateMedicineUseCaseOutput = MedicineOutput
