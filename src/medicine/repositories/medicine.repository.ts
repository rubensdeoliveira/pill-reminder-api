import { MedicineEntity } from '@/medicine/entities/medicine.entity'

export abstract class MedicineRepository {
  abstract create(
    data: CreateMedicineRepositoryInput,
  ): Promise<CreateMedicineRepositoryOutput>

  abstract delete(
    data: DeleteMedicineRepositoryInput,
  ): Promise<DeleteMedicineRepositoryOutput>

  abstract findById(
    data: FindByIdMedicineRepositoryInput,
  ): Promise<FindByIdMedicineRepositoryOutput>

  abstract findByActiveIngredient(
    data: FindByActiveIngredientMedicineRepositoryInput,
  ): Promise<FindByActiveIngredientMedicineRepositoryOutput>

  abstract update(
    data: UpdateMedicineRepositoryInput,
  ): Promise<UpdateMedicineRepositoryOutput>
}

export type CreateMedicineRepositoryInput = Omit<MedicineEntity, 'id'>

export type CreateMedicineRepositoryOutput = MedicineEntity

export type DeleteMedicineRepositoryInput = {
  id: string
}

export type DeleteMedicineRepositoryOutput = void

export type FindByIdMedicineRepositoryInput = {
  id: string
}

export type FindByIdMedicineRepositoryOutput = MedicineEntity | null

export type FindByActiveIngredientMedicineRepositoryInput = {
  activeIngredient: string
}

export type FindByActiveIngredientMedicineRepositoryOutput =
  MedicineEntity | null

export type UpdateMedicineRepositoryInput = MedicineEntity

export type UpdateMedicineRepositoryOutput = MedicineEntity
