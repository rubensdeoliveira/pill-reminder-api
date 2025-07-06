export type MedicineEntity = {
  id: string
  activeIngredient: string
  dosage: string
  pharmaceuticalForm: string
  administrationRoute: string
  posology: string
  createdAt?: Date | null
  updatedAt?: Date | null
}
