import { MedicineOutput } from '@/medicine/dtos/medicine.dto'

export type GetMedicineUseCaseInput = {
  id: string
}

export type GetMedicineUseCaseOutput = MedicineOutput
