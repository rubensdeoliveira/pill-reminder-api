import { ConflictException, Injectable } from '@nestjs/common'

import { EncryptionGateway } from '@/_shared/gateways/encryption.gateway'
import {
  CreateDentistUseCaseInput,
  CreateDentistUseCaseOutput,
} from '@/dentist/dtos/create-dentist.dto'
import { DentistRepository } from '@/dentist/repositories/dentist.repository'

@Injectable()
export class CreateDentistUseCase {
  constructor(
    private dentistRepository: DentistRepository,
    private encryptionGateway: EncryptionGateway,
  ) {}

  async execute(
    input: CreateDentistUseCaseInput,
  ): Promise<CreateDentistUseCaseOutput> {
    const accountWithSameEmail = await this.dentistRepository.findByEmail({
      email: input.email,
    })
    if (accountWithSameEmail) {
      throw new ConflictException('Account with same email already exists')
    }

    const hashedPassword = await this.encryptionGateway.createHash(
      input.password,
    )

    const { id, role, name, email, phone, dob } =
      await this.dentistRepository.create({
        ...input,
        password: hashedPassword,
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
