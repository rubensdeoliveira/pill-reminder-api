import { DentistEntity } from '@/dentist/entities/dentist.entity'

export type GetDentistUseCaseInput = { accountId: string }

export type GetDentistUseCaseOutput = DentistEntity
