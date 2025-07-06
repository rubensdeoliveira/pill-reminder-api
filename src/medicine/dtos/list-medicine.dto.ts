import {
  ListPaginatedInputPagination,
  ListPaginatedOutput,
} from '@/_shared/repositories/types/list-options'
import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export type ListMedicineInput = ListPaginatedInputPagination

export type ListMedicineOutputItem = Pick<MedicineEntity, 'id' | 'name'>

export type ListMedicineOutput = ListPaginatedOutput<ListMedicineOutputItem>
