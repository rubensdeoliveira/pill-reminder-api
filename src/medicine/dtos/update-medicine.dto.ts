export type UpdateMedicineUseCaseInput = {
  id: string
  name?: string
}

export type UpdateMedicineUseCaseOutput = {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
}
