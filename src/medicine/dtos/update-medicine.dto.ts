import { MedicineInput, MedicineOutput } from '@/medicine/dtos/medicine.dto'

export type UpdateMedicineUseCaseInput = MedicineInput & {
  id: string
}

export type UpdateMedicineUseCaseOutput = MedicineOutput
