import { ConflictException, Injectable } from '@nestjs/common'

import {
  CreatePatientUseCaseInput,
  CreatePatientUseCaseOutput,
} from '@/patient/dtos/create-patient.dto'
import { PatientRepository } from '@/patient/repositories/patient.repository'

@Injectable()
export class CreatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(
    input: CreatePatientUseCaseInput,
  ): Promise<CreatePatientUseCaseOutput> {
    const accountWithSameInfo =
      await this.patientRepository.findByPhoneAndDob(input)
    if (accountWithSameInfo) {
      throw new ConflictException(
        'Account with same phone and dob already exists',
      )
    }

    const { id, email, role, name, phone, dob } =
      await this.patientRepository.create({
        ...input,
        password: null,
      })

    return {
      id,
      name,
      email,
      phone,
      dob,
      role,
    }
  }
}
