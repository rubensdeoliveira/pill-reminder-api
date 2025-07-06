import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export type CreateMedicineRepositoryInput = {
  name: string
}
export type CreateMedicineRepositoryOutput = MedicineEntity

export type DeleteMedicineRepositoryInput = {
  id: string
}
export type DeleteMedicineRepositoryOutput = void

export type FindByIdMedicineRepositoryInput = {
  id: string
}
export type FindByIdMedicineRepositoryOutput = MedicineEntity | null

export type UpdateMedicineRepositoryInput = {
  id: string
  name: string
}
export type UpdateMedicineRepositoryOutput = MedicineEntity

export abstract class MedicineRepository {
  abstract create(
    data: CreateMedicineRepositoryInput,
  ): Promise<CreateMedicineRepositoryOutput>

  abstract findById(
    data: FindByIdMedicineRepositoryInput,
  ): Promise<FindByIdMedicineRepositoryOutput>

  abstract update(
    data: UpdateMedicineRepositoryInput,
  ): Promise<UpdateMedicineRepositoryOutput>

  abstract delete(
    data: DeleteMedicineRepositoryInput,
  ): Promise<DeleteMedicineRepositoryOutput>
}
