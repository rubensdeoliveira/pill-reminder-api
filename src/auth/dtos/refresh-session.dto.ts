export type RefreshSessionUseCaseInput = {
  token: string
}

export type RefreshSessionUseCaseOutput = {
  accessToken: string
  refreshToken: string
}
