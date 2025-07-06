import { Injectable } from '@nestjs/common'

import { JwtGateway } from '@/_shared/gateways/jwt.gateway'
import {
  CreateDentistSessionWithGoogleUseCaseInput,
  CreateDentistSessionWithGoogleUseCaseOutput,
} from '@/auth/dtos/create-dentist-session-with-google.dto'
import { DentistEntity } from '@/dentist/entities/dentist.entity'
import { DentistRepository } from '@/dentist/repositories/dentist.repository'

@Injectable()
export class CreateDentistSessionWithGoogleUseCase {
  constructor(
    private dentistRepository: DentistRepository,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    input: CreateDentistSessionWithGoogleUseCaseInput,
  ): Promise<CreateDentistSessionWithGoogleUseCaseOutput> {
    let account: DentistEntity | null =
      await this.dentistRepository.findByEmail({
        email: input.email,
      })
    if (!account) {
      account = await this.dentistRepository.create({
        ...input,
        dob: null,
        phone: null,
        password: null,
      })
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: account.id,
        role: account.role,
      })

    return {
      account: {
        id: account.id,
        name: account.name,
        email: account.email,
        phone: account.phone,
        dob: account.dob,
        role: account.role,
      },
      accessToken,
      refreshToken,
    }
  }
}
