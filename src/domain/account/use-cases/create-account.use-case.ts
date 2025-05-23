import { ConflictException, Injectable } from '@nestjs/common'

import { EncryptionGateway } from '@/domain/account/gateways/encryption.gateway'
import { AccountModel } from '@/domain/account/models/account.model'
import { AccountRepository } from '@/domain/account/repositories/account.repository'

type CreateAccountUseCaseRequest = {
  email: string
  name: string
  password: string
}

type CreateAccountUseCaseResponse = AccountModel

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private encryptionGateway: EncryptionGateway,
  ) {}

  async execute(
    data: CreateAccountUseCaseRequest,
  ): Promise<CreateAccountUseCaseResponse> {
    const { email, name, password } = data

    const accountWithSameEmail = await this.accountRepository.findByEmail(email)
    if (accountWithSameEmail) {
      throw new ConflictException('Account with same email already exists')
    }

    const hashedPassword = await this.encryptionGateway.createHash(password)

    const { id } = await this.accountRepository.create({
      email,
      name,
      password: hashedPassword,
    })

    return {
      email,
      name,
      id,
    }
  }
}
