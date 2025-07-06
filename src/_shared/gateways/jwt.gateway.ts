export enum AccountRole {
  ADMIN = 'ADMIN',
  PATIENT = 'PATIENT',
  DENTIST = 'DENTIST',
}

export type AccountRoleType = keyof typeof AccountRole

export type JwtSignRequest = {
  payload: JwtPayload
  expiresIn: string
}
export type JwtSignResponse = string

export type JwtVerifyRequest = string
export type JwtVerifyResponse = JwtPayload

export type JwtPayload = {
  accountId: string
  role: AccountRoleType
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
