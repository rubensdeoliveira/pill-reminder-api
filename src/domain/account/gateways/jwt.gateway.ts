export type JwtPayload = {
  accountId: string
}

export type JwtSignRequest = {
  payload: JwtPayload
  expiresIn: string
}

export type JwtSignResponse = string

export type JwtVerifyRequest = string

export type JwtVerifyResponse = JwtPayload

export type JwtGenerateAuthTokensRequest = JwtPayload

export type JwtGenerateAuthTokensResponse = {
  accessToken: string
  refreshToken: string
}

export abstract class JwtGateway {
  abstract sign(params: JwtSignRequest): JwtSignResponse
  abstract verify(params: JwtVerifyRequest): JwtVerifyResponse
  abstract generateAuthTokens(
    params: JwtGenerateAuthTokensRequest,
  ): Promise<JwtGenerateAuthTokensResponse>
}
