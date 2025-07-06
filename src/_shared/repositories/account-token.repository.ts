import { AccountRoleType } from '@/_shared/gateways/jwt.gateway'

export abstract class AccountTokenRepository {
  abstract create(
    data: CreateAccountTokenRepositoryInput,
  ): Promise<CreateAccountTokenRepositoryOutput>

  abstract deleteById(
    data: DeleteByIdAccountTokenRepositoryInput,
  ): Promise<DeleteByIdAccountTokenRepositoryOutput>

  abstract findByAccountIdAndRefreshToken(
    data: FindByAccountIdAndRefreshTokenAccountTokenRepositoryInput,
  ): Promise<FindByAccountIdAndRefreshTokenAccountTokenRepositoryOutput>
}

export type CreateAccountTokenRepositoryInput = {
  accountId: string
  refreshToken: string
  expiresDate: Date
}

export type CreateAccountTokenRepositoryOutput = void

export type DeleteByIdAccountTokenRepositoryInput = {
  id: string
}

export type DeleteByIdAccountTokenRepositoryOutput = void

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
