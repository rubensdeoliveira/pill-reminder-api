import { ConflictException, Injectable } from '@nestjs/common'

import { EncryptionGateway } from '@/_shared/gateways/encryption.gateway'
import { JwtGateway } from '@/_shared/gateways/jwt.gateway'
import {
  CreateDentistSessionUseCaseInput,
  CreateDentistSessionUseCaseOutput,
} from '@/auth/dtos/create-dentist-session.dto'
import { DentistRepository } from '@/dentist/repositories/dentist.repository'

@Injectable()
export class CreateDentistSessionUseCase {
  constructor(
    private dentistRepository: DentistRepository,
    private encryptionGateway: EncryptionGateway,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    input: CreateDentistSessionUseCaseInput,
  ): Promise<CreateDentistSessionUseCaseOutput> {
    const account = await this.dentistRepository.findByEmail({
      email: input.email,
    })
    if (!account || !account.password) {
      throw new ConflictException('Email/password does not matches')
    }

    const passwordIsMatched = await this.encryptionGateway.validateHash({
      hashedValue: account.password,
      value: input.password,
    })
    if (!passwordIsMatched) {
      throw new ConflictException('Email/password does not matches')
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: account.id,
        role: account.role,
      })

    const { id, name, email, phone, dob, role } = account

    return {
      account: { email, id, name, phone, dob, role },
      accessToken,
      refreshToken,
    }
  }
}
