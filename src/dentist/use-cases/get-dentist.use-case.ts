import { Injectable, NotFoundException } from '@nestjs/common'

import { AccountRepository } from '@/auth/repositories/account.repository'
import {
  GetDentistUseCaseInput,
  GetDentistUseCaseOutput,
} from '@/dentist/dtos/get-dentist.dto'
import { toDentistOutput } from '@/dentist/mappers/dentist.mapper'

@Injectable()
export class GetDentistUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    accountId,
  }: GetDentistUseCaseInput): Promise<GetDentistUseCaseOutput> {
    const dentist = await this.accountRepository.findById({
      id: accountId,
    })

    if (!dentist || !dentist.email) {
      throw new NotFoundException('Dentist does not exists')
    }

    return toDentistOutput(dentist)
  }
}
