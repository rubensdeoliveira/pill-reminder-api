export type GetMedicineUseCaseInput = {
  id: string
}

export type GetMedicineUseCaseOutput = {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
}
