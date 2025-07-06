export abstract class JwtGateway {
  abstract sign({ payload, expiresIn }: JwtSignInput): JwtSignOutput

  abstract verify(token: JwtVerifyInput): JwtVerifyOutput

  abstract generateAuthTokens({
    accountId,
    role,
  }: JwtGenerateAuthTokensInput): Promise<JwtGenerateAuthTokensOutput>
}

export type JwtSignInput = {
  payload: JwtPayload
  expiresIn: string
}

export type JwtSignOutput = string

export type JwtVerifyInput = string

export type JwtVerifyOutput = JwtPayload

export type JwtGenerateAuthTokensInput = JwtPayload

export type JwtGenerateAuthTokensOutput = {
  accessToken: string
  refreshToken: string
}

// Auxiliary types

export enum AccountRole {
  ADMIN = 'ADMIN',
  PATIENT = 'PATIENT',
  DENTIST = 'DENTIST',
}

export type AccountRoleType = keyof typeof AccountRole

export type JwtPayload = {
  accountId: string
  role: AccountRoleType
}
