export type AccountTokenEntity = {
  id: string
  refreshToken: string
  accountId: string
  expiresDate: Date
  createdAt?: Date | null
  updatedAt?: Date | null
}
