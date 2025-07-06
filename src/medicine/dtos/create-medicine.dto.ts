import { MedicineOutput } from '@/medicine/dtos/medicine.dto'
import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export type CreateMedicineUseCaseInput = Pick<MedicineEntity, 'name'>

export type CreateMedicineUseCaseOutput = MedicineOutput
