import { Injectable } from '@nestjs/common'

import { JwtGateway } from '@/domain/account/gateways/jwt.gateway'
import { AccountModel } from '@/domain/account/models/account.model'
import { AccountRepository } from '@/domain/account/repositories/account.repository'

type CreateSessionWithGoogleUseCaseRequest = {
  email: string
  name: string
}

export type CreateSessionWithGoogleUseCaseResponse = {
  account: AccountModel
  accessToken: string
  refreshToken: string
}

@Injectable()
export class CreateSessionWithGoogleUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    data: CreateSessionWithGoogleUseCaseRequest,
  ): Promise<CreateSessionWithGoogleUseCaseResponse> {
    const { email, name } = data

    let account = await this.accountRepository.findByEmail(email)
    if (!account) {
      account = await this.accountRepository.create({
        email,
        name,
        password: null,
      })
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: account.id,
      })

    const { id } = account

    return {
      account: { email, id, name },
      accessToken,
      refreshToken,
    }
  }
}
