import { ConflictException, Injectable } from '@nestjs/common'

import { AccountRepository } from '@/auth/repositories/account.repository'
import {
  CreatePatientUseCaseInput,
  CreatePatientUseCaseOutput,
} from '@/patient/dtos/create-patient.dto'
import { toPatientOutput } from '@/patient/mappers/patient.mapper'

@Injectable()
export class CreatePatientUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    dob,
    name,
    phone,
  }: CreatePatientUseCaseInput): Promise<CreatePatientUseCaseOutput> {
    const patientWithSameInfo = await this.accountRepository.findByPhoneAndDob({
      dob,
      phone,
    })
    if (patientWithSameInfo) {
      throw new ConflictException(
        'Patient with same phone and dob already exists',
      )
    }

    const patient = await this.accountRepository.create({
      dob,
      name,
      phone,
      email: null,
      role: 'PATIENT',
      password: null,
    })

    return toPatientOutput(patient)
  }
}
