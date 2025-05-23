import { AccountTokenEntity } from '@/domain/account/repositories/entities/account-token.entity'
import { DefaultRepository } from '@/domain/shared/repositories/default.repository'

export type FindByAccountIdAndRefreshTokenParams = {
  accountId: string
  refreshToken: string
}

export abstract class AccountTokenRepository extends DefaultRepository<AccountTokenEntity> {
  abstract findByAccountIdAndRefreshToken(
    params: FindByAccountIdAndRefreshTokenParams,
  ): Promise<AccountTokenEntity | null>
}
