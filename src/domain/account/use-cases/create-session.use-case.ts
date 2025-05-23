import { ConflictException, Injectable } from '@nestjs/common'

import { EncryptionGateway } from '@/domain/account/gateways/encryption.gateway'
import { JwtGateway } from '@/domain/account/gateways/jwt.gateway'
import { AccountModel } from '@/domain/account/models/account.model'
import { AccountRepository } from '@/domain/account/repositories/account.repository'

type CreateSessionUseCaseRequest = {
  email: string
  password: string
}

type CreateSessionUseCaseResponse = {
  account: AccountModel
  accessToken: string
  refreshToken: string
}

@Injectable()
export class CreateSessionUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private encryptionGateway: EncryptionGateway,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    data: CreateSessionUseCaseRequest,
  ): Promise<CreateSessionUseCaseResponse> {
    const { email, password } = data

    const account = await this.accountRepository.findByEmail(email)
    if (!account || !account.password) {
      throw new ConflictException('Email/password does not matches')
    }

    const passwordIsMatched = await this.encryptionGateway.validateHash({
      hashedValue: account.password,
      value: password,
    })
    if (!passwordIsMatched) {
      throw new ConflictException('Email/password does not matches')
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: account.id,
      })

    const { id, name } = account

    return {
      account: { email, id, name },
      accessToken,
      refreshToken,
    }
  }
}
