import { Injectable, NotFoundException } from '@nestjs/common'

import {
  GetPatientUseCaseInput,
  GetPatientUseCaseOutput,
} from '@/patient/dtos/get-patient.dto'
import { PatientRepository } from '@/patient/repositories/patient.repository'

@Injectable()
export class GetPatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(
    input: GetPatientUseCaseInput,
  ): Promise<GetPatientUseCaseOutput> {
    const account = await this.patientRepository.findById({
      id: input.accountId,
    })
    if (!account || !account.phone || !account.dob) {
      throw new NotFoundException('Account does not exists')
    }
    const { email, id, name, phone, dob, role } = account
    return { email, id, name, phone, dob, role }
  }
}
