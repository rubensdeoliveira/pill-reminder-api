import { ConflictException, Injectable } from '@nestjs/common'

import { JwtGateway } from '@/_shared/gateways/jwt.gateway'
import {
  CreatePatientSessionUseCaseInput,
  CreatePatientSessionUseCaseOutput,
} from '@/auth/dtos/create-patient-session.dto'
import { PatientRepository } from '@/patient/repositories/patient.repository'

@Injectable()
export class CreatePatientSessionUseCase {
  constructor(
    private patientRepository: PatientRepository,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    input: CreatePatientSessionUseCaseInput,
  ): Promise<CreatePatientSessionUseCaseOutput> {
    const account = await this.patientRepository.findByPhoneAndDob(input)
    if (!account || !account.phone || !account.dob) {
      throw new ConflictException('Patient account does not exists')
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
