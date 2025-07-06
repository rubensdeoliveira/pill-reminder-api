import { AccountTokenEntity } from '@/auth/entities/account-token.entity'
import { AccountRoleType } from '@/auth/gateways/jwt.gateway'

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

export type CreateAccountTokenRepositoryInput = Omit<AccountTokenEntity, 'id'>

export type CreateAccountTokenRepositoryOutput = AccountTokenEntity

export type DeleteByIdAccountTokenRepositoryInput = {
  id: string
}

export type DeleteByIdAccountTokenRepositoryOutput = void

export type FindByAccountIdAndRefreshTokenAccountTokenRepositoryInput = {
  accountId: string
  refreshToken: string
}

export type FindByAccountIdAndRefreshTokenAccountTokenRepositoryOutput =
  AccountTokenWithAccountRoleEntity | null

// Auxiliary types

type AccountTokenWithAccountRoleEntity = AccountTokenEntity & {
  account: {
    role: AccountRoleType
  }
}
