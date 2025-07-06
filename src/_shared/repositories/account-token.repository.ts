import { AccountRoleType } from '@/_shared/gateways/jwt.gateway'

export type CreateAccountTokenRepositoryInput = {
  accountId: string
  refreshToken: string
  expiresDate: Date
}

export type FindByAccountIdAndRefreshTokenAccountTokenRepositoryInput = {
  accountId: string
  refreshToken: string
}

export type FindByAccountIdAndRefreshTokenAccountTokenRepositoryOutput = {
  id: string
  account: {
    role: AccountRoleType
  }
} | null

export type DeleteByIdAccountTokenRepositoryInput = {
  id: string
}

export abstract class AccountTokenRepository {
  abstract create(data: CreateAccountTokenRepositoryInput): Promise<void>
  abstract findByAccountIdAndRefreshToken(
    data: FindByAccountIdAndRefreshTokenAccountTokenRepositoryInput,
  ): Promise<FindByAccountIdAndRefreshTokenAccountTokenRepositoryOutput>

  abstract deleteById(
    data: DeleteByIdAccountTokenRepositoryInput,
  ): Promise<void>
}
