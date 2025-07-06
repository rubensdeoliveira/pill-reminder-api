import { ConflictException, Injectable } from '@nestjs/common'

import { EncryptionGateway } from '@/_shared/gateways/encryption.gateway'
import { AccountRepository } from '@/auth/repositories/account.repository'
import {
  CreateDentistUseCaseInput,
  CreateDentistUseCaseOutput,
} from '@/dentist/dtos/create-dentist.dto'
import { toDentistOutput } from '@/dentist/mappers/dentist.mapper'

@Injectable()
export class CreateDentistUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private encryptionGateway: EncryptionGateway,
  ) {}

  async execute({
    dob,
    email,
    name,
    password,
    phone,
  }: CreateDentistUseCaseInput): Promise<CreateDentistUseCaseOutput> {
    const dentistWithSameEmail = await this.accountRepository.findByEmail({
      email,
    })

    if (dentistWithSameEmail) {
      throw new ConflictException('Dentist with same email already exists')
    }

    const hashedPassword = await this.encryptionGateway.createHash({
      value: password,
    })

    const dentist = await this.accountRepository.create({
      dob,
      email,
      name,
      phone,
      password: hashedPassword,
      role: 'DENTIST',
    })

    return toDentistOutput(dentist)
  }
}
