type Role = 'ADMIN' | 'PATIENT' | 'DENTIST'

export type JwtSignRequest = {
  payload: JwtPayload
  expiresIn: string
}
export type JwtSignResponse = string

export type JwtVerifyRequest = string
export type JwtVerifyResponse = JwtPayload

export type JwtPayload = {
  accountId: string
  role: Role
}

export type JwtGenerateAuthTokensResponse = {
  accessToken: string
  refreshToken: string
}
export type JwtGenerateAuthTokensRequest = JwtPayload

export abstract class JwtGateway {
  abstract sign({ payload, expiresIn }: JwtSignRequest): JwtSignResponse

  abstract verify(token: JwtVerifyRequest): JwtVerifyResponse
  abstract generateAuthTokens({
    accountId,
    role,
  }: JwtGenerateAuthTokensRequest): Promise<JwtGenerateAuthTokensResponse>
}
