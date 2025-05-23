import { Injectable, NotFoundException } from '@nestjs/common'

import { AccountModel } from '@/domain/account/models/account.model'
import { AccountRepository } from '@/domain/account/repositories/account.repository'

type GetAccountUseCaseRequest = { accountId: string }

type GetAccountUseCaseResponse = AccountModel

@Injectable()
export class GetAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    data: GetAccountUseCaseRequest,
  ): Promise<GetAccountUseCaseResponse> {
    const { accountId } = data
    const account = await this.accountRepository.findById(accountId)
    if (!account) {
      throw new NotFoundException('Account does not exists')
    }
    const { email, id, name } = account
    return { email, id, name }
  }
}
