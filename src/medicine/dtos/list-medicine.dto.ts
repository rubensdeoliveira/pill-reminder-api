import {
  ListPaginatedInputPagination,
  ListPaginatedOutput,
} from '@/_shared/repositories/generic.repository'
import { MedicineOutput } from '@/medicine/dtos/medicine.dto'

export type ListMedicineInput = ListPaginatedInputPagination

export type ListMedicineOutput = ListPaginatedOutput<MedicineOutput>
