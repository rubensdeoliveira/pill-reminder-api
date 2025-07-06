import { Injectable, NotFoundException } from '@nestjs/common'

import {
  GetDentistUseCaseInput,
  GetDentistUseCaseOutput,
} from '@/dentist/dtos/get-dentist.dto'
import { DentistRepository } from '@/dentist/repositories/dentist.repository'

@Injectable()
export class GetDentistUseCase {
  constructor(private readonly dentistRepository: DentistRepository) {}

  async execute(
    input: GetDentistUseCaseInput,
  ): Promise<GetDentistUseCaseOutput> {
    const account = await this.dentistRepository.findById({
      id: input.accountId,
    })
    if (!account || !account.email) {
      throw new NotFoundException('Account does not exists')
    }
    const { email, id, name, phone, dob, role } = account
    return { email, id, name, phone, dob, role }
  }
}
