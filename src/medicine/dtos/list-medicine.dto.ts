import {
  ListPaginatedInput,
  ListPaginatedOutput,
} from '@/_shared/repositories/shared.repository'
import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export type ListMedicineInput = ListPaginatedInput

export type ListMedicineOutput = ListPaginatedOutput<MedicineEntity>
