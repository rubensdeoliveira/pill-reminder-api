import { ConflictException, Injectable } from '@nestjs/common'

import {
  CreatePatientSessionUseCaseInput,
  CreatePatientSessionUseCaseOutput,
} from '@/auth/dtos/create-patient-session.dto'
import { JwtGateway } from '@/auth/gateways/jwt.gateway'
import { AccountRepository } from '@/auth/repositories/account.repository'
import { toPatientOutput } from '@/patient/mappers/patient.mapper'

@Injectable()
export class CreatePatientSessionUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private jwtGateway: JwtGateway,
  ) {}

  async execute({
    dob,
    phone,
  }: CreatePatientSessionUseCaseInput): Promise<CreatePatientSessionUseCaseOutput> {
    const patient = await this.accountRepository.findByPhoneAndDob({
      dob,
      phone,
    })
    if (!patient || !patient.phone || !patient.dob) {
      throw new ConflictException('Patient account does not exists')
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: patient.id,
        role: patient.role,
      })

    return {
      patient: toPatientOutput(patient),
      accessToken,
      refreshToken,
    }
  }
}
