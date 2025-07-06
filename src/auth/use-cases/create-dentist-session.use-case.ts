import { ConflictException, Injectable } from '@nestjs/common'

import { EncryptionGateway } from '@/_shared/gateways/encryption.gateway'
import {
  CreateDentistSessionUseCaseInput,
  CreateDentistSessionUseCaseOutput,
} from '@/auth/dtos/create-dentist-session.dto'
import { JwtGateway } from '@/auth/gateways/jwt.gateway'
import { AccountRepository } from '@/auth/repositories/account.repository'
import { toDentistOutput } from '@/dentist/mappers/dentist.mapper'

@Injectable()
export class CreateDentistSessionUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private encryptionGateway: EncryptionGateway,
    private jwtGateway: JwtGateway,
  ) {}

  async execute({
    email,
    password,
  }: CreateDentistSessionUseCaseInput): Promise<CreateDentistSessionUseCaseOutput> {
    const dentist = await this.accountRepository.findByEmail({
      email,
    })
    if (!dentist || !dentist.password) {
      throw new ConflictException('Email/password does not matches')
    }

    const passwordIsMatched = await this.encryptionGateway.validateHash({
      hashedValue: dentist.password,
      value: password,
    })
    if (!passwordIsMatched) {
      throw new ConflictException('Email/password does not matches')
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: dentist.id,
        role: dentist.role,
      })

    return {
      dentist: toDentistOutput(dentist),
      accessToken,
      refreshToken,
    }
  }
}
