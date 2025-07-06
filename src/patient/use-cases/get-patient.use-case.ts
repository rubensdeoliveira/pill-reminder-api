import { Injectable, NotFoundException } from '@nestjs/common'

import { AccountRepository } from '@/auth/repositories/account.repository'
import {
  GetPatientUseCaseInput,
  GetPatientUseCaseOutput,
} from '@/patient/dtos/get-patient.dto'
import { toPatientOutput } from '@/patient/mappers/patient.mapper'

@Injectable()
export class GetPatientUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    input: GetPatientUseCaseInput,
  ): Promise<GetPatientUseCaseOutput> {
    const patient = await this.accountRepository.findById({
      id: input.accountId,
    })
    if (!patient || !patient.phone || !patient.dob) {
      throw new NotFoundException('Patient does not exists')
    }
    return toPatientOutput(patient)
  }
}
