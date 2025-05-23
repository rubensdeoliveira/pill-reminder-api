import { AccountEntity } from '@/domain/account/repositories/entities/account.entity'
import { DefaultRepository } from '@/domain/shared/repositories/default.repository'

export abstract class AccountRepository extends DefaultRepository<AccountEntity> {
  abstract findByEmail(email: string): Promise<AccountEntity | null>
}
