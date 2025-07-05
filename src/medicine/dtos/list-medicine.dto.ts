import { PaginationOutput } from '@/_shared/dtos/pagination.dto'
import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export type ListMedicineOutput = PaginationOutput<MedicineEntity>
