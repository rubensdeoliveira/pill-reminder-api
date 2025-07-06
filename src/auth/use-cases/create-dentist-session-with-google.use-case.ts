import { Injectable } from '@nestjs/common'

import {
  CreateDentistSessionWithGoogleUseCaseInput,
  CreateDentistSessionWithGoogleUseCaseOutput,
} from '@/auth/dtos/create-dentist-session-with-google.dto'
import { JwtGateway } from '@/auth/gateways/jwt.gateway'
import { AccountRepository } from '@/auth/repositories/account.repository'
import { DentistEntity } from '@/dentist/entities/dentist.entity'
import { toDentistOutput } from '@/dentist/mappers/dentist.mapper'

@Injectable()
export class CreateDentistSessionWithGoogleUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private jwtGateway: JwtGateway,
  ) {}

  async execute({
    email,
    name,
  }: CreateDentistSessionWithGoogleUseCaseInput): Promise<CreateDentistSessionWithGoogleUseCaseOutput> {
    let dentist: DentistEntity | null =
      await this.accountRepository.findByEmail({
        email,
      })
    if (!dentist) {
      dentist = await this.accountRepository.create({
        email,
        name,
        role: 'DENTIST',
        dob: null,
        phone: null,
        password: null,
      })
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
